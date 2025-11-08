import { Body, Controller, Post, Req, Res } from '@nestjs/common';

import * as express from 'express';
import {
  InvalidCredentialException,
  UserNofoundException,
} from 'src/exceptions/forbiddend.exception';
import { AuthService } from './auth.service';
import { UserInterface } from 'src/users/users.interface';
import { JwtService } from '@nestjs/jwt';
import { Public } from './public.metadata';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    email: string;
    roles: string;
  }
}
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() signInDto: Pick<UserInterface, 'email' | 'password'>,
    @Req() req: express.Request,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    try {
      const user = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      if (!user) {
        throw new UserNofoundException();
      }
      // Set a signed cookie
      response.cookie('sessionId', user?.id + 'password', {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 360000000, // 1 hour
      });

      // set up session
      req.session.userId = user.id;
      req.session.email = user.email;
      req.session.roles = user.roles;
      const payload = { sub: user.id, ...user };
      return { access_token: await this.jwtService.signAsync(payload) };
    } catch (error) {
      throw error;
    }
  }
}

import { Body, Controller, Post, Req, Res } from '@nestjs/common';

import * as express from 'express';
import { InvalidCredentialException } from 'src/exceptions/forbiddend.exception';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    username: string;
    role: string;
  }
}
@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Res({ passthrough: true }) response: express.Response,
    @Req() req: express.Request,
): {
    message: string;
  } {
    const user = {id: 42, username: "testuser", role: "admin"}; // Example user ID
    if (!user) {
        throw new InvalidCredentialException();
    }
    // Set a signed cookie
    response.cookie('sessionId', user.id + 'password', {
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 360000000, // 1 hour
    });

    // set up session
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;
    return { message: 'Login successful' };
  }
}

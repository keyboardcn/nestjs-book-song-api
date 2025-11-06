import { Body, Controller, Post, Res } from '@nestjs/common';

import * as express from 'express';
@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Res({ passthrough: true }) response: express.Response): {
    message: string;
  } {
    const userId = 1; // Example user ID
    // Set a signed cookie
    response.cookie('sessionId', userId + 'password', {
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 360000000, // 1 hour
    });
    return { message: 'Login successful' };
  }
}

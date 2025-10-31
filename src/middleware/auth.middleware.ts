import {
  HttpException,
  Injectable,
  NestMiddleware,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ForbiddenException } from 'src/exceptions/forbiddend.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Auth request class...');
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    console.log(token);
    if (!token) {
      //throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      throw new ForbiddenException();
    }
    next();
  }
}

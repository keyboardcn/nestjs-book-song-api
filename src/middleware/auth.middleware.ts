import {
  HttpException,
  Injectable,
  NestMiddleware,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ForbiddenException } from 'src/exceptions/forbiddend.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Auth request class...');
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    this.logger.log(token);
    if (!token) {
      //throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      throw new ForbiddenException();
    }
    next();
  }
}

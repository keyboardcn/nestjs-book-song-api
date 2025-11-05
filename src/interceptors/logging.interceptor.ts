import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { NotFoundException } from 'src/exceptions/forbiddend.exception';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('logging.interceptors.ts Before handling the request...');
    return next.handle().pipe(
      tap((data) => {
        if (!data) {
          throw new NotFoundException();
        }
        this.logger.log('After handling the request...');
      }),
    );
  }
}

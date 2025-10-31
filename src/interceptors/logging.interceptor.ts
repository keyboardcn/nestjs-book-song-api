import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { NotFoundException } from 'src/exceptions/forbiddend.exception';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('logging.interceptors.ts Before handling the request...');
    return next.handle().pipe(
      tap((data) => {
        if (!data) {
          throw new NotFoundException();
        }
        console.log('After handling the request...');
      }),
    );
  }
}

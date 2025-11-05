import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = new Logger('LoggerMiddleware');
  logger.log(
    `${req.method} ${req.originalUrl}`,
  );
  next();
}

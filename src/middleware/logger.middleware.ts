import { Request, Response, NextFunction } from 'express';
export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `logger.middleware.ts Function middleware ${req.method} ${req.originalUrl}`,
  );
  next();
}

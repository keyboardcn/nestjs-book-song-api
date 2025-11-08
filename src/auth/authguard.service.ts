import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.metadata';

@Injectable()
export class AuthGuardService implements CanActivate {
  private readonly logger = new Logger(AuthGuardService.name);

  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      this.logger.log(`public route`);
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extracTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {});
      this.logger.log(`Jwt payload: ${JSON.stringify(payload)}`);
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extracTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request.headers['authorization'] as string | undefined)?.split(' ') ??
      [];
    if (!token || type !== 'Bearer') {
      return undefined;
    }
    return token;
  }
}

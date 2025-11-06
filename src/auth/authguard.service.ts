import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuardService implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        // Check for signed cookie
        const sessionId = request.signedCookies['sessionId'];
        if (sessionId) {
            // Here you can add additional verification for sessionId if needed
            return true;
        }
        return false;
    }
}
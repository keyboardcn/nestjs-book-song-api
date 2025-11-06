import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor() {
    super('Not Found Error', HttpStatus.NOT_FOUND);
  }
}

export class InvalidCredentialException extends HttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.NOT_FOUND);
  }
}
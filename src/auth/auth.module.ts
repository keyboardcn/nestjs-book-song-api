import { Module } from '@nestjs/common';
import { AuthController } from './auth.contoller';

@Module({
  imports: [],
  providers: [],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.contoller';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { AuthGuardService } from './authguard.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret as string,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, UsersService, 
    AuthGuardService,
    {
      provide: APP_GUARD,
      useClass: AuthGuardService
    }
  ],
  controllers: [AuthController],
  exports: [AuthGuardService]
})
export class AuthModule {}

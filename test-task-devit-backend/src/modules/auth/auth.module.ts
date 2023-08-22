import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '../../database/prisma.service';
import { ExistUserByLoginOrEmail } from '../../helpers/decorators/user/exist.user.by.login-email';
import { RefreshTokenStrategy } from '../../interceptors/strategies/jwt-refresh.strategy';
import { JwtStrategy } from '../../interceptors/strategies/jwt.strategy';
import { LocalStrategy } from '../../interceptors/strategies/local.strategy';
import { ApiJwtModule } from '../jwt/apiJwt.module';
import { UsersRepo } from '../user/repositories/user.repo';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    EventEmitterModule.forRoot(),
    CqrsModule,
    PassportModule,
    ApiJwtModule
  ],
  providers: [
    // service
    PrismaService,
    JwtService,
    AuthService,
    UsersRepo,
    // validation
    ExistUserByLoginOrEmail,
    // guards
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy
  ]
})
export class AuthModule {}

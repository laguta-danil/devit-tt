import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../database/prisma.service';

import { UsersRepo } from './repositories/user.repo';
import { DeleteUserUseCase } from './use-case/delete.user.use-case';
import { GetUserUseCase } from './use-case/get.user.profile.use-case';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [CqrsModule],
  providers: [
    // service
    PrismaService,
    DeleteUserUseCase,
    GetUserUseCase,
    // repositories
    UsersRepo
  ]
})
export class UserModule {}

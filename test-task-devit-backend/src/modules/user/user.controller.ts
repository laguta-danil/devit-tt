import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import JwtAuthGuard from '../../interceptors/guards/jwt-auth.guard';
import { RequestWithUserData } from '../../types/Request.with.user';
import { ApiDeleteUser, ApiUpdateUserProfile } from '../auth/auth.swagger';

import { DeleteUserCommand } from './use-case/delete.user.use-case';
import { GetUserCommand } from './use-case/get.user.profile.use-case';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUpdateUserProfile()
  async getUser(@Req() req: RequestWithUserData, @Res() res: Response) {
    res
      .status(200)
      .send(await this.commandBus.execute(new GetUserCommand(req.user.id)));
  }

  @Delete('/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteUser()
  async deleteUser(@Req() req: RequestWithUserData) {
    return this.commandBus.execute(new DeleteUserCommand(req.user.id));
  }
}

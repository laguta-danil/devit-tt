import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersRepo } from '../repositories/user.repo';

export class DeleteUserCommand {
  constructor(public dto: number) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserUseCase implements ICommandHandler<DeleteUserCommand> {
  constructor(private usersRepo: UsersRepo) {}

  async execute({ dto }: DeleteUserCommand) {
    try {
      return this.usersRepo.deleteUser(dto);
    } catch (e) {
      throw new HttpException(
        { error: e, message: 'User do not find' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

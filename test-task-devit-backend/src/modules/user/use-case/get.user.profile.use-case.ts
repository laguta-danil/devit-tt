import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersRepo } from '../repositories/user.repo';

export class GetUserCommand {
  constructor(public dto: number) {}
}

@CommandHandler(GetUserCommand)
export class GetUserUseCase implements ICommandHandler<GetUserCommand> {
  constructor(private usersRepo: UsersRepo) {}

  async execute({ dto }: GetUserCommand) {
    try {
      return this.usersRepo.findById(dto);
    } catch (e) {
      throw new HttpException(
        { error: e, message: 'User do not find' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

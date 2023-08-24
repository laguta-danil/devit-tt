import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PostsRepo } from '../repositories/post.repo';

export class RemovePostCommand {
  constructor(public id: number) {}
}

@CommandHandler(RemovePostCommand)
export class RemovePostUseCase implements ICommandHandler<RemovePostCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ id }: RemovePostCommand) {
    try {
      await this.postsRepo.remove(id);
    } catch (e) {
      throw new HttpException(
        { error: e, message: 'Posts can not be deleted' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

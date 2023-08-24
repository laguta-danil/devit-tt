import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PostsRepo } from '../repositories/post.repo';

export class GetPostCommand {
  constructor(public id: number) {}
}

@CommandHandler(GetPostCommand)
export class GetPostUseCase implements ICommandHandler<GetPostCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ id }: GetPostCommand) {
    try {
      return await this.postsRepo.findById(id);
    } catch (e) {
      throw new HttpException(
        { error: e, message: 'Post not found' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdatePostDto } from '../dto/update-post.dto';
import { PostsRepo } from '../repositories/post.repo';

export class UpdatePostCommand {
  constructor(public dto: { updatePostDto: UpdatePostDto; id: number }) {}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostUseCase implements ICommandHandler<UpdatePostCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ dto }: UpdatePostCommand) {
    const { updatePostDto, id } = dto;

    try {
      await this.postsRepo.update(updatePostDto, id);
    } catch (e) {
      throw new HttpException(
        { error: e, message: 'Posts can not be updated' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

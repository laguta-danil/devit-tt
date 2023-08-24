import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IUser } from '../../user/types/user.type';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsRepo } from '../repositories/post.repo';

export class CreatePostCommand {
  constructor(
    public dto: {
      createPostDto: CreatePostDto;
      user: IUser;
    }
  ) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostUseCase implements ICommandHandler<CreatePostCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ dto }: CreatePostCommand) {
    const { createPostDto, user } = dto;

    try {
      await this.postsRepo.create(createPostDto, user);
    } catch (e) {
      throw new HttpException(
        { error: e, message: 'Posts can not be created' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

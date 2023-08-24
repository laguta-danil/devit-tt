import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PostsRequest } from '../dto/filtering-post.dto';
import { PostsRepo } from '../repositories/post.repo';
import { IPost } from '../types/post.type';

export class GetPostsCommand {
  constructor(public dto: PostsRequest) {}
}

@CommandHandler(GetPostsCommand)
export class GetPostsUseCase implements ICommandHandler<GetPostsCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ dto }: GetPostsCommand) {
    try {
      const { search, itemsPerPage, page, order } = dto;
      const take = +itemsPerPage || 10;
      const skip = (page - 1) * itemsPerPage || 0;
      const posts: IPost[] = await this.postsRepo.findAllPosts(
        order,
        skip,
        take,
        search
      );

      return { data: posts, total: posts.length };
    } catch (e) {
      throw new HttpException(
        { error: e, message: 'Posts not found' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

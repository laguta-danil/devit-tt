import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaService } from '../../database/prisma.service';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostsRepo } from './repositories/post.repo';
import { CreatePostUseCase } from './use-case/create.post.use-case';
import { GetPostsUseCase } from './use-case/getall.posts.use-case';
import { GetPostUseCase } from './use-case/getone.post.use-case';
import { RemovePostUseCase } from './use-case/remove.post.use-case';
import { UpdatePostUseCase } from './use-case/update.post.use-case';

@Module({
  controllers: [PostController],
  imports: [ScheduleModule.forRoot(), CqrsModule],
  providers: [
    // services
    PostService,
    PrismaService,
    //cqrs use-cases
    GetPostsUseCase,
    CreatePostUseCase,
    UpdatePostUseCase,
    GetPostUseCase,
    RemovePostUseCase,
    // repositories
    PostsRepo
  ]
})
export class PostModule {}

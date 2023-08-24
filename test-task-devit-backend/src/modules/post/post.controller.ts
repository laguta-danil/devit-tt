import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import JwtAuthGuard from '../../interceptors/guards/jwt-auth.guard';
import { RequestWithUserData } from '../../types/Request.with.user';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsRequest } from './dto/filtering-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiCreatePost,
  ApiDeletePost,
  ApiGetPost,
  ApiGetPosts,
  ApiUpdatePost
} from './post.swagger';
import { CreatePostCommand } from './use-case/create.post.use-case';
import { GetPostsCommand } from './use-case/getall.posts.use-case';
import { GetPostCommand } from './use-case/getone.post.use-case';
import { RemovePostCommand } from './use-case/remove.post.use-case';
import { UpdatePostCommand } from './use-case/update.post.use-case';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiCreatePost()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestWithUserData
  ) {
    await this.commandBus.execute(
      new CreatePostCommand({ createPostDto, user: req.user })
    );
  }

  @ApiGetPosts()
  @Get('/get-all')
  async findAll(@Res() res: Response, @Query() query: PostsRequest) {
    res
      .status(200)
      .send(await this.commandBus.execute(new GetPostsCommand(query)));
  }

  @ApiGetPost()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    res.status(200).send(await this.commandBus.execute(new GetPostCommand(id)));
  }

  @ApiUpdatePost()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    await this.commandBus.execute(
      new UpdatePostCommand({ id, updatePostDto: updatePostDto })
    );
  }

  @ApiDeletePost()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.commandBus.execute(new RemovePostCommand(id));
  }
}

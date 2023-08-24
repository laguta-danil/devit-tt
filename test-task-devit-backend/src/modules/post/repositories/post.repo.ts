import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { IUser } from '../../user/types/user.type';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsRepo {
  constructor(private readonly prisma: PrismaService) {}

  async create(post: CreatePostDto, user: IUser) {
    post.pubDate = new Date();
    post.authorId = user.id.toString();
    post.author = user.username;

    return this.prisma.post.create({
      data: post
    });
  }

  async findById(id: number) {
    return this.prisma.post.findFirst({
      where: { id }
    });
  }

  async findAllPosts(order, skip: number, take: number, search: string) {
    return this.prisma.post.findMany({
      orderBy: { pubDate: order },
      skip: skip,
      take: take,
      where: { title: { contains: `${search}`, mode: 'insensitive' } }
    });
  }

  async update(data, id) {
    try {
      await this.prisma.post.update({
        data: { ...data },
        where: { id }
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      return this.prisma.post.delete({
        where: { id }
      });
    } catch (error) {
      return error;
    }
  }
}

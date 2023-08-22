import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserByUsername(username: string) {
    const usersCount = await this.prisma.user.count();
    const temporaryPassword = await bcrypt.hash('admin', 10);

    if (usersCount === 0) {
      await this.prisma.user.create({
        data: {
          password: temporaryPassword,
          username: 'admin'
        }
      });
    }

    return this.prisma.user.findFirst({
      select: { id: true, password: true, username: true },
      where: { username: username }
    });
  }

  async findById(id: number) {
    return this.prisma.user.findFirst({
      where: { id }
    });
  }

  async updateUserProfile(id, data) {
    try {
      return this.prisma.user.update({
        data: { ...data },
        where: { id }
      });
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: number) {
    try {
      return this.prisma.user.delete({
        where: { id }
      });
    } catch (error) {
      return error;
    }
  }
}

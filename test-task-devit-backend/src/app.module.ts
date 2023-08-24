import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule
  ],
  providers: [PrismaService]
})
export class AppModule {}

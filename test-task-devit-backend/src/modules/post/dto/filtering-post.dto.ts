import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostsRequest {
  @ApiProperty({
    description: 'Search for posts, let it empty for get all posts',
    example: ' ',
    maxLength: 100,
    minLength: 0,
    pattern: '[a-zA-Z0-9_-]*$'
  })
  @IsString()
  search: string;

  @ApiProperty({
    description: 'Posts per page, default 12',
    example: 12
  })
  @IsString()
  itemsPerPage: number;

  @ApiProperty({
    description: 'Number of page',
    example: 1
  })
  @IsString()
  page: number;

  @ApiProperty({
    description: 'Can be asc or desc only',
    example: 'asc'
  })
  @IsString()
  order: string;
}

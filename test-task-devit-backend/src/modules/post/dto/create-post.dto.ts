import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length
} from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiProperty({
    description: 'Post title',
    example: 'title',
    maxLength: 120,
    minLength: 0
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 120)
  readonly title: string;

  @ApiProperty({
    description: 'Post description',
    example: 'description'
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Post link if you want link to another site',
    example: 'https://www.google.com/'
  })
  @IsNotEmpty()
  @IsString()
  readonly link: string;

  @IsOptional()
  @IsString()
  pubDate?: Date;

  @ApiProperty({
    description: 'Post image link',
    example:
      'https://tvojarabota.pl/img/400/49b16bb8d40a3f0e2bba9ba44b65bfd9.jpg'
  })
  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string;

  @ApiProperty({
    description: 'Post categories',
    example: ['dogs', 'cats', 'etc']
  })
  @IsNotEmpty()
  @IsArray()
  readonly categories: string[] | [];
}

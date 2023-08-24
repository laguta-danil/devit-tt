import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl
} from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly link: string;

  @IsOptional()
  @IsString()
  pubDate?: Date;

  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string;

  @IsNotEmpty()
  @IsArray()
  readonly categories: string[] | [];
}

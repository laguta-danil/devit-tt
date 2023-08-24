import { IsString } from 'class-validator';

export class PostsRequest {
  @IsString()
  search: string;

  @IsString()
  itemsPerPage: number;

  @IsString()
  page: number;

  @IsString()
  order: string;
}

import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { apiBadRequestResponse } from '../../utils/swagger/api.error.response';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsRequest } from './dto/filtering-post.dto';

export function ApiGetPost() {
  return applyDecorators(
    ApiOperation({ summary: 'Get post by id' }),
    ApiBody({
      schema: {
        properties: {
          id: {
            example: 5434,
            type: 'number'
          }
        }
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Post send',
      status: HttpStatus.OK
    })
  );
}

export function ApiGetPosts() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all posts' }),
    ApiBody({ type: PostsRequest }),
    ApiResponse({
      description: "User's posts send",
      status: HttpStatus.OK
    })
  );
}

export function ApiUpdatePost() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update Post'
    }),
    ApiBody({ type: CreatePostDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Post updated',
      status: HttpStatus.OK
    })
  );
}

export function ApiDeletePost() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete post by id' }),
    ApiBody({
      schema: {
        properties: {
          id: {
            example: 6523,
            type: 'number'
          }
        }
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Post deleted',
      status: HttpStatus.OK
    })
  );
}

export function ApiCreatePost() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create new Post'
    }),
    ApiBody({ type: CreatePostDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Post uploaded',
      status: HttpStatus.OK
    })
  );
}

import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { apiBadRequestResponse } from '../../utils/swagger/api.error.response';

export function ApiGetUserData() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user data' }),
    ApiBody({
      schema: {
        properties: {
          autoData: {
            example: "User's credentials will be get from cookie",
            type: 'string'
          }
        }
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Profile updated',
      status: HttpStatus.OK
    })
  );
}

export function ApiDeleteUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete user!!!' }),
    ApiBody({
      schema: {
        properties: {
          id: { example: 6533, type: 'nubmer' }
        }
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'User deleted',
      status: HttpStatus.OK
    })
  );
}

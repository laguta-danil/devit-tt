import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { apiBadRequestResponse } from '../../utils/swagger/api.error.response';

import { LoginDto } from './dto/login.dto';

export function ApiAuthorization() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Authorization (if your users table in database empty, user with username&password "admin" will be create automatically)'
    }),
    ApiBody({ type: LoginDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Token send',
      status: HttpStatus.OK
    })
  );
}

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
    ApiOperation({ summary: 'Authorization' }),
    ApiBody({ type: LoginDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Token send',
      status: HttpStatus.OK
    })
  );
}

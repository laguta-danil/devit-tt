import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches, Validate } from 'class-validator';

import { ExistUserByLoginOrEmail } from '../../../helpers/decorators/user/exist.user.by.login-email';
import { Trim } from '../../../helpers/decorators/validation/trim';

export class UserDto {
  @ApiProperty({
    description:
      'Unique login of the user (6-30 characters). Allowed characters: letters, numbers, underscores, and hyphens',
    example: 'user',
    maxLength: 30,
    minLength: 6,
    pattern: '[a-zA-Z0-9_-]*$',
    uniqueItems: true
  })
  @Matches('^[a-zA-Z0-9_-]*$')
  @Length(3, 30)
  @Trim()
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123',
    maxLength: 20,
    minLength: 6
  })
  @Length(6, 20)
  @Trim()
  @IsString()
  readonly password: string;
}

export class CreateUserDto extends UserDto {
  @Validate(ExistUserByLoginOrEmail)
  readonly username: string;
}

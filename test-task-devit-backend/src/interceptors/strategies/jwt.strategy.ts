import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersRepo } from '../../modules/user/repositories/user.repo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersRepo: UsersRepo,
    private configService: ConfigService
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    try {
      if (
        req.cookies.Authorization &&
        'accessToken' in req.cookies.Authorization
      ) {
        return req.cookies.Authorization.accessToken;
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Your request have not access cookie(, please login at first'
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async validate(payload: { id: number }) {
    const user = await this.usersRepo.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.id, username: user.username };
  }
}

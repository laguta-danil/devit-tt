import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ApiJwtService } from '../jwt/apiJwt.services';
import { UsersRepo } from '../user/repositories/user.repo';

@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersRepo,
    private apiJwtService: ApiJwtService
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.usersRepo.checkUserByUsername(username);

    if (await this.verifyPassword(password, user.password)) {
      delete user.password;

      return user;
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );

    return !!isPasswordMatching;
  }

  public getJwtTokens(id: string) {
    return this.apiJwtService.createJWT(id);
  }

  private async updateRefreshTokenInUserRep(
    userId: string,
    refreshToken: string
  ) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepo.updateUserProfile(userId, {
      refreshToken: hashedRefreshToken
    });
  }

  async login(userData) {
    try {
      const tokens = await this.getJwtTokens(userData.id);
      await this.updateRefreshTokenInUserRep(userData.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      throw new HttpException(
        { error: error, message: 'Wrong credentials provided' },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async refreshAccessToken(req) {
    const id = req.user.id;
    const refreshToken = req.cookies.Authorization.refreshToken;
    const user = await this.usersRepo.findById(id);

    if (await bcrypt.compare(refreshToken, user.refreshToken)) {
      return this.apiJwtService.getNewAccessToken(user.id, refreshToken);
    }
    throw new HttpException(
      { message: 'Refresh token expired' },
      HttpStatus.BAD_REQUEST
    );
  }
}

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { LocalAuthGuard } from '../../interceptors/guards/local-auth.guard';
import { RefreshAuthGuard } from '../../interceptors/guards/refresh-auth.guard';
import { RequestWithUserData } from '../../types/Request.with.user';

import { AuthService } from './auth.service';
import { ApiAuthorization } from './auth.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(RefreshAuthGuard)
  @Get('/refresh-token')
  async refreshTokens(
    @Req() req: RequestWithUserData,
    @Res({ passthrough: true }) res: Response
  ) {
    const newAuthToken = await this.authService.refreshAccessToken(req);
    res.cookie('Authorization', newAuthToken, { httpOnly: true });
    res.status(200).send({ message: 'Success' });
  }

  @Post('/login')
  @ApiAuthorization()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(@Req() req: RequestWithUserData, @Res() res: Response) {
    const authToken = await this.authService.login(req.user);
    res.cookie('Authorization', authToken, { httpOnly: true });
    res.status(200).send({ message: 'Success' });
  }

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res() res: Response) {
    res.cookie('Authorization', null, { httpOnly: true });
    res.sendStatus(200);
  }
}

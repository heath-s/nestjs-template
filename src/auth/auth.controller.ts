import { AuthGuard } from '@nestjs/passport';
import { Controller, ForbiddenException, Get, Post, Request, Response, UseGuards, UseFilters } from '@nestjs/common';

import { AuthExceptionFilter } from './auth-exception.filter';
import CONSTANTS from './constants';
import { User } from './user.decorator';

@UseFilters(AuthExceptionFilter)
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('jwt-on-cookie'))
  @Get('me')
  async getMe(@User() user) {
    return user;
  }

  @UseGuards(AuthGuard('jwt-on-bearer'))
  @Post('signin/jwt')
  async postSigninJwt(@Request() request, @Response() response) {
    if (request.header('Origin') !== `https://${CONSTANTS.KERBEROS_DOMAIN}`) {
      throw new ForbiddenException();
    }

    const { exp } = request.user.payload;
    response.cookie(CONSTANTS.COOKIE_NAME, request.jwt, {
      domain: '',
      expires: new Date(exp * 1000),
      httpOnly: false,
      path: '/',
      secure: false,
      signed: false,
    });

    return response.status(200).send({ status: 200 });
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import CONSTANTS from './constants';

@Injectable()
export class JwtOnCookieStrategy extends PassportStrategy(Strategy, 'jwt-on-cookie') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: (request) =>
        (request && request.cookies && request.cookies[CONSTANTS.COOKIE_NAME]) || null,
      ignoreExpiration: false,
      secretOrKey: CONSTANTS.PUBLIC_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validate(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { payload, user };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import CONSTANTS from './constants';

@Injectable()
export class JwtOnBearerStrategy extends PassportStrategy(Strategy, 'jwt-on-bearer') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: (request) =>
        (request.jwt = (request.get('Authorization') || '').replace(/^Bearer\s+/, '')),
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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtOnBearerStrategy extends PassportStrategy(Strategy, 'jwt-on-bearer') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: (request) =>
        (request.jwt = (request.header('Authorization') || '').replace(/^Bearer\s+/, '')),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.publicKey,
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

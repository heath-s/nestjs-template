import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

import CONSTANTS from './constants';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException | ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    res
      .status(status)
      .clearCookie(CONSTANTS.COOKIE_NAME)
      .send(exception.message);
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Array<string | ((req: Request) => string)>>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const stringRoles = roles.map((role) => typeof role === 'function' ? role(req) : role);

    if (!(req.user && req.user.user)) {
      return false;
    }

    const { authorities } = req.user.user;
    return (authorities || []).some((role) => stringRoles.includes(role));
  }
}

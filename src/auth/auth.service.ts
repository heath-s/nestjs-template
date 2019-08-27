import { Injectable } from '@nestjs/common';

import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  async validate(payload: any) {
    const authority = payload.authority[jwtConstants.serviceName];
    if (!(authority && authority instanceof Object)) {
      return null;
    }

    const authorities = Object.keys(authority).filter((key) => authority[key]);
    const { department, mail: email, employeeid: employeeId, userid: userId, username } = payload;
    return { authorities, department, email, employeeId, userId, username };
  }
}

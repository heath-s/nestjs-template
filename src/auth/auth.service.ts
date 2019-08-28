import { Injectable } from '@nestjs/common';

import CONSTANTS from './constants';

@Injectable()
export class AuthService {
  async validate(payload: any) {
    const authority = payload.authority[CONSTANTS.SERVICE_NAME];
    if (!(authority && authority instanceof Object)) {
      return null;
    }

    const authorities = Object.keys(authority).filter((key) => authority[key]);
    const { department, mail: email, employeeid: employeeId, userid: userId, username } = payload;
    return { authorities, department, email, employeeId, userId, username };
  }
}

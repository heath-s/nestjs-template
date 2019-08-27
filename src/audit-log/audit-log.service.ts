import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

const IS_TEST = process.env.NODE_ENV === 'test';

@Injectable()
export class AuditLogService {
  async createError(context: string, request: Request, error: Error) {
    const log = this.getLogFromRequest(context, request, error);

    if (IS_TEST) {
      Logger.error(log, error.stack, 'AuditLogService::createError');
      return;
    }

    // TODO
  }

  async createSuccess(context: string, request: Request) {
    const log = this.getLogFromRequest(context, request);

    if (IS_TEST) {
      Logger.log(log, 'AuditLogService::createSuccess');
      return;
    }

    // TODO
  }

  private getLogFromRequest(context: string, request: Request, error?: Error) {
    return {
      context,
      request: {
        body: request.body,
        headers: request.headers,
        ip: request.ip,
        user: (request.user as any).user,
      },
      error: error ?
        { message: error.message, stack: error.stack } :
        undefined,
    };
  }
}

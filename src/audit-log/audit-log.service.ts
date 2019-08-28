import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { AuditLog } from './audit-log.entity';

const IS_TEST = process.env.NODE_ENV === 'test';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog, 'AuditLogConnection')
    private readonly repository: Repository<AuditLog>,
  ) {}

  createError(context: string, request: Request, error: Error) {
    const log = this.getItemInstance(context, request, error);

    if (IS_TEST) {
      Logger.error(log, error.stack, 'AuditLogService::createError');
      return;
    }

    const item = new AuditLog();
    item.context = log.context;
    item.error = log.error;
    item.nickname = log.nickname;
    item.request = log.request;
    item.username = log.username;

    return this.repository.save(log);
  }

  createSuccess(context: string, request: Request) {
    const log = this.getItemInstance(context, request);

    if (IS_TEST) {
      Logger.log(log, 'AuditLogService::createSuccess');
      return;
    }

    return this.repository.save(log);
  }

  private getItemInstance(context: string, request: Request, error?: Error) {
    const user = (request.user && (request.user as any).user) || {};

    const auditLog = new AuditLog();
    auditLog.context = context;
    auditLog.error = error ?
      { message: error.message, stack: error.stack } :
      undefined;
    auditLog.request = {
      body: request.body,
      endpoint: `${request.method} ${request.originalUrl}`,
      headers: request.headers,
      ip: request.ip,
      user,
    };
    auditLog.username = user.userId;
    auditLog.nickname = user.username;

    return auditLog;
  }
}

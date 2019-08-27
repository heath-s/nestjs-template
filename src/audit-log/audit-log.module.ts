import { Module } from '@nestjs/common';

import { AuditLogController } from './audit-log.controller';
import { AuditLogInterceptor } from './audit-log.interceptor';
import { AuditLogService } from './audit-log.service';

@Module({
  controllers: [
    AuditLogController,
  ],
  providers: [
    AuditLogInterceptor,
    AuditLogService,
  ],
  exports: [
    AuditLogInterceptor,
    AuditLogService,
  ],
})
export class AuditLogModule {}

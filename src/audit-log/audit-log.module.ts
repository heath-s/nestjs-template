import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuditLog } from './audit-log.entity';
import { AuditLogController } from './audit-log.controller';
import { AuditLogInterceptor } from './audit-log.interceptor';
import { AuditLogService } from './audit-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog], 'AuditLogConnection'),
  ],
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

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuditLogModule,
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}

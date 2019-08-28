import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuditLog } from './audit-log/audit-log.entity';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuthModule } from './auth/auth.module';
import DEFAULT_TYPEORM_OPTIONS from './default-typeorm-options';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'AuditLogConnection',
      ...DEFAULT_TYPEORM_OPTIONS,
      synchronize: true,
      entities: [AuditLog],
    }),
    TypeOrmModule.forRoot({
      ...DEFAULT_TYPEORM_OPTIONS,
      // synchronize: true,
      // entities: [],
    }),
    TypeOrmModule.forFeature([AuditLog], 'AuditLogConnection'),
    AuditLogModule,
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}

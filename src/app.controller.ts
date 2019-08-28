import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, UseFilters, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { AuditLog } from './audit-log/audit-log.entity';
import { AuditLogInterceptor } from './audit-log/audit-log.interceptor';
import { AuthExceptionFilter } from './auth/auth-exception.filter';
import { Pagination } from './shared/pagination.decorator';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';

@UseFilters(AuthExceptionFilter)
@UseGuards(AuthGuard('jwt-on-bearer'), RolesGuard)
@Controller()
export class AppController {
  constructor(
    @InjectRepository(AuditLog, 'AuditLogConnection')
    private readonly auditLogRepo: Repository<AuditLog>,
  ) { }

  @Roles('admin')
  @Get('audit-logs/:id')
  async getAuditLogItem(@Param('id') id: number) {
    return await this.auditLogRepo.findOne(id);
  }

  @Roles('admin')
  @Get('audit-logs')
  async getAuditLogList(
    @Pagination(20) { skip, take },
    @Query('search-by') by?: string, @Query('search-keyword') keyword?: string,
  ) {
    const where = {};
    if (by && keyword) {
      where[by] = by === 'nickname' ? Like(`%${keyword}%`) : keyword;
    }

    const [logs, count] = await this.auditLogRepo.findAndCount({
      select: ['id', 'context', 'error', 'nickname', 'username', 'createdAt'],
      where,
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
    return { count, logs };
  }

  @UseInterceptors(AuditLogInterceptor)
  @Roles('admin', 'user')
  @Get('user')
  getUser() {
    return { message: 'user ok' };
  }

  @UseInterceptors(AuditLogInterceptor)
  @Roles('admin')
  @Get('admin')
  getAdmin() {
    return { message: 'admin ok' };
  }

  @UseInterceptors(AuditLogInterceptor)
  @Roles((request) => request.params.game)
  @Get(':game')
  getGame(@Param('game') game) {
    return { message: `${game} ok` };
  }
}

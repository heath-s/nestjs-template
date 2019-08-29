import { Controller, Get, Param, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { AuditLog } from './audit-log.entity';
import { Pagination } from '../shared/pagination.decorator';

@Controller('audit-logs')
export class AuditLogController {
  constructor(
    @InjectRepository(AuditLog, 'AuditLogConnection')
    private readonly auditLogRepo: Repository<AuditLog>,
  ) { }

  @Get(':id')
  async getAuditLogItem(@Param('id') id: number) {
    return await this.auditLogRepo.findOne(id);
  }

  @Get('')
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
}

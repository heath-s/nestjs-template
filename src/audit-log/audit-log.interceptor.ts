import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuditLogService } from './audit-log.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly service: AuditLogService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = `${context.getClass().name}::${context.getHandler().name}`;
    const request = context.switchToHttp().getRequest();

    return next.handle()
      .pipe(
        tap(() => this.service.createSuccess(ctx, request)),
        catchError((error) => {
          this.service.createError(ctx, request, error);
          throw error;
        }),
      );
  }
}

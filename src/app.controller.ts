import { Controller } from '@nestjs/common';

// @UseFilters(AuthExceptionFilter)
// @UseGuards(AuthGuard('jwt-on-bearer'), RolesGuard)
@Controller()
export class AppController {
  // @UseInterceptors(AuditLogInterceptor)
  // @Roles('admin', 'user')
  // @Get('user')
  // getUser() {
  //   return { message: 'user ok' };
  // }

  // @UseInterceptors(AuditLogInterceptor)
  // @Roles('admin')
  // @Get('admin')
  // getAdmin() {
  //   return { message: 'admin ok' };
  // }

  // @UseInterceptors(AuditLogInterceptor)
  // @Roles((request) => request.params.game)
  // @Get(':game')
  // getGame(@Param('game') game) {
  //   return { message: `${game} ok` };
  // }
}

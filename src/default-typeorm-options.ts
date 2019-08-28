const ENV = process.env;

// TODO: Database 설정
let DEFAULT_TYPEORM_OPTIONS;
switch (ENV.NODE_ENV) {
  case 'test':
    DEFAULT_TYPEORM_OPTIONS = {
      type: 'mysql',
      username: 'nestjs_template',
      password: 'nestjs_template',
      database: 'nestjs_template',
      host: 'localhost',
      port: 3306,
      logging: true,
    };
    break;

  case 'production':
    DEFAULT_TYPEORM_OPTIONS = {
      type: 'mysql',
      username: ENV.DB_USERNAME,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      host: ENV.DB_HOSTNAME,
      port: ENV.DB_PORT,
      logging: false,
    };
    break;

  default:
    DEFAULT_TYPEORM_OPTIONS = {
      type: 'mysql',
      username: 'nestjs_template',
      password: 'nestjs_template',
      database: 'nestjs_template',
      host: 'localhost',
      port: 3306,
      logging: true,
    };
    break;
}

export default DEFAULT_TYPEORM_OPTIONS;

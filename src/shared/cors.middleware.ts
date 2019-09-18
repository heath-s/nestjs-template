import { NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CorsMiddleware = (options: CorsOptions) => {
  return class implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
      cors(options)(req, res, next);
    }
  };
};

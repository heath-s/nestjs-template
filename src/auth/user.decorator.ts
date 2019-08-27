import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((key: string, req) =>
  req.user && (key ? req.user.user && req.user.user[key] : req.user.user),
);

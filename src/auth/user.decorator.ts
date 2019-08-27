import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((key: string, request) =>
  request.user && (key ? request.user.user && request.user.user[key] : request.user.user),
);

import { createParamDecorator } from '@nestjs/common';

export const Pagination = createParamDecorator((lim: number, request) => {
  let { limit = lim, page = 1 } = request.query || {};
  limit = Math.max(1, Math.ceil(+limit));
  page = Math.max(1, Math.ceil(+page));

  return {
    page,
    skip: (page - 1) * limit,
    take: limit,
  };
});

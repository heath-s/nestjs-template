import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: Array<string | ((req: Request) => string)>) => SetMetadata('roles', args);

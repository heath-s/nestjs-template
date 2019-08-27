import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: Array<string | ((request: Request) => string)>) => SetMetadata('roles', args);

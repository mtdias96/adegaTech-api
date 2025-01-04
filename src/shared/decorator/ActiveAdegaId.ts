import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const ActiveAdegaId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const adegaId = request['adegaId'];

    if (!adegaId) {
      throw new UnauthorizedException('Adega not found');
    }
    return adegaId;
  },
);

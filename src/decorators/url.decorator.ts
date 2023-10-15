import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUrl = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const protocol =  request.protocol 
    const host = request.get("Host")
    const url = `${protocol}://${host}`
    return url
  },
);
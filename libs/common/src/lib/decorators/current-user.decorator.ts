import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const user = context
      .switchToHttp()
      .getRequest<Request & { user: UserPayload }>().user;
    return user;
  },
);

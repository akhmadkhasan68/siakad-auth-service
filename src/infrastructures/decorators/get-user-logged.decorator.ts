import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/databases/interaces/user.interface';

export const GetUserLogged = createParamDecorator(
    async (data, ctx: ExecutionContext): Promise<IUser> => {
        return ctx.switchToHttp().getRequest().user;
    },
);

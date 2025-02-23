import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { UserPayload } from "../auth-interfaces/user-payload.type";
import { USER_KEY } from "../auth-constans/user-key.const";

type AuthRequest = Request & {
  user: UserPayload | undefined;
};

export const ActiveUser = createParamDecorator(
  (field, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const user = request[USER_KEY];
    if (!user) throw new UnauthorizedException();
    return { userId: user.aud, email: user.email };
  },
);

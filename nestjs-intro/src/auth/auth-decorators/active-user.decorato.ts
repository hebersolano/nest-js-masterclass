import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { USER_KEY } from "../auth-constans/user-key.const";
import { AccessTokenData } from "../auth-interfaces/user-payload.type";

type AuthRequest = Request & {
  user: AccessTokenData | undefined;
};

export const ActiveUser = createParamDecorator(
  (field, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const user = request[USER_KEY];
    if (!user) throw new UnauthorizedException();
    return { userId: user.uid, email: user.email, exp: user.exp };
  },
);

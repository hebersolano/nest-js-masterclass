import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthType } from "src/auth/auth-enums/auth-type.enum";
import { AccessTokenGuard } from "../access-token/access-token.guard";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: {
      canActivate: () => true,
    },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // authType metadata from the reflect class
    let authType: AuthType | undefined;
    authType = this.reflector.getAllAndOverride<AuthType | undefined>(
      "authType",
      [context.getHandler(), context.getClass()],
    );

    if (!authType) authType = AuthenticationGuard.defaultAuthType;
    return await this.authTypeGuardMap[authType].canActivate(context);
  }
}

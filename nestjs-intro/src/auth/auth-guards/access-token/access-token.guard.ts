import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { USER_KEY } from "src/auth/auth-constans/user-key.const";
import jwtConfig from "src/auth/config/jwt.config";

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract request from the execution context
    const request = context.switchToHttp().getRequest<Request>();
    // extract token form the header
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    // validate token
    try {
      const payload = await this.jwtService.verifyAsync<object>(token, {
        secret: this.jwtConfiguration.secret,
      });
      request[USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization) return undefined;
    const [type, token] = authorization.split(" ");
    return type === "Bearer" ? token : undefined;
  }
}

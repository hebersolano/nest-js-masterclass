import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user.entity";
import jwtConfig from "../config/jwt.config";

@Injectable()
export class TokenProvider {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
  ) {}

  async verifyToken<T extends object>(token: string): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token, {
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async generateTokens(user: User) {
    return await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);
  }

  async generateAccessToken(user: User) {
    return await this.signToken(user.id, this.jwtConfiguration.refreshTtl, {
      email: user.email,
    });
  }

  async generateRefreshToken(user: User) {
    return await this.signToken(user.id, this.jwtConfiguration.refreshTtl);
  }

  async signToken<T>(
    userId: number,
    expiresIn: string | number | undefined,
    payload?: T,
  ) {
    const token = await this.jwtService.signAsync(
      {
        uid: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        expiresIn,
      },
    );

    return token;
  }
}

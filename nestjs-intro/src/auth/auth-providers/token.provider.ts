import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user-entities/user.entity";
import jwtConfig from "../config/jwt.config";

@Injectable()
export class TokenProvider {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
  ) {}

  /**
   * Verify string token and returns payload if it's valid
   * @param token String
   * @returns Object, token payload
   */
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

  /**
   * Generates access-token and refresh-token
   * @param user User
   * @returns [String, String], [accessToken, refreshToken]
   */
  async generateTokens(user: User) {
    return await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);
  }

  private async generateAccessToken(user: User) {
    return await this.signToken(user.id, this.jwtConfiguration.ttl, {
      email: user.email,
    });
  }

  private async generateRefreshToken(user: User) {
    return await this.signToken(user.id, this.jwtConfiguration.refreshTtl);
  }

  /**
   *
   * @param userId
   * @param expiresIn
   * @param payload Object
   * @returns
   */
  private async signToken<T>(
    userId: number,
    expiresIn: string | number | undefined,
    payload?: T,
  ) {
    try {
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
    } catch {
      throw new InternalServerErrorException();
    }
  }
}

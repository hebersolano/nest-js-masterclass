import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/users/user-providers/user.service";
import { SignInDto } from "../auth-dtos/signin.dto";
import { HashingProvider } from "./hashing.provider";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";
import { User } from "src/users/user.entity";
import { RefreshTokenDto } from "../auth-dtos/refresh-token.dto";
import { UserPayload } from "../auth-interfaces/user-payload.type";

@Injectable()
export class AuthService {
  constructor(
    // configuration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    // find the user using email
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // compare password to the hash
    const isAuthenticated = await this.hashingProvider.comparePassword(
      signInDto.password,
      user.password,
    );
    if (!isAuthenticated)
      throw new UnauthorizedException("Password or email is incorrect");
    // send confirmation
    const [accessToken, refreshToken] = await this.generateTokens(user);

    return { accessToken, refreshToken };
  }

  async refreshTokes(refreshTokenDto: RefreshTokenDto) {
    // verify refresh token
    let payload: UserPayload | undefined;
    try {
      payload = await this.jwtService.verifyAsync<UserPayload>(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          issuer: this.jwtConfiguration.issuer,
          audience: this.jwtConfiguration.audience,
        },
      );
    } catch {
      throw new UnauthorizedException();
    }
    // fetch user from DB
    // generate tokes
  }

  /**
   * @param user
   * @returns [accessToken, refreshToken]
   */
  private async generateTokens(user: User) {
    return await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);
  }

  private async generateAccessToken(user: User) {
    return await this.signToken(user.id, this.jwtConfiguration.refreshTtl, {
      email: user.email,
    });
  }
  private async generateRefreshToken(user: User) {
    return await this.signToken(user.id, this.jwtConfiguration.refreshTtl);
  }

  private async signToken<T>(
    userId: number,
    expiresIn: string | number | undefined,
    payload?: T,
  ) {
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
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

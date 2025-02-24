import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user-providers/user.service";
import { RefreshTokenDto } from "../auth-dtos/refresh-token.dto";
import { SignInDto } from "../auth-dtos/signin.dto";
import { RefreshTokenData } from "../auth-interfaces/user-payload.type";
import jwtConfig from "../config/jwt.config";
import { HashingProvider } from "./hashing.provider";
import { TokenProvider } from "./token.provider";

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

    private readonly tokenProvider: TokenProvider,
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
    const [accessToken, refreshToken] =
      await this.tokenProvider.generateTokens(user);

    return { accessToken, refreshToken };
  }

  async refreshTokes(refreshTokenDto: RefreshTokenDto) {
    // verify refresh token
    const payload = await this.tokenProvider.verifyToken<RefreshTokenData>(
      refreshTokenDto.refreshToken,
    );
    // fetch user from DB
    const user = await this.usersService.findOneById(parseInt(payload.aud));
    // generate tokes
    const [accessToken, refreshToken] =
      await this.tokenProvider.generateTokens(user);

    return { accessToken, refreshToken };
  }
}

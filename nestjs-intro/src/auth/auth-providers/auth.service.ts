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

  login(email: string, password: string, id?: string) {
    console.log(email, password, id);
    // check user exists database
    const user = this.usersService.findOneById(1);
    console.log(">>> login user", user);
    // login
    // token
    return user;
  }

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
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        expiresIn: this.jwtConfiguration.ttl,
      },
    );

    return accessToken;
  }

  isAuth() {
    return true;
  }
}

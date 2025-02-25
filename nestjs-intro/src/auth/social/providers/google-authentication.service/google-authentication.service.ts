import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { TokenProvider } from "src/auth/auth-providers/token.provider";
import jwtConfig from "src/auth/config/jwt.config";
import { UserService } from "src/users/user-providers/user.service";
import { GoogleTokenDto } from "../../social-dtos/google-token.dto";

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthclient: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,

    private readonly tokenProvider: TokenProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthclient = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(googleTokenDto: GoogleTokenDto) {
    let payload: TokenPayload | undefined;
    try {
      // verify the Google token
      const loginTicket = await this.oauthclient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // extract payload
      payload = loginTicket.getPayload();
      if (!payload) throw new Error();
    } catch {
      throw new UnauthorizedException();
    }

    console.log(">> google token payload", payload);
    const {
      sub: googleId,
      email,
      given_name: firstName,
      family_name: lastName,
    } = payload;

    try {
      // find user in DB
      const user = await this.usersService.findOneBy({
        googleId,
      });
      // if googleId exists generate tokens
      return this.tokenProvider.generateTokens(user);
    } catch (error) {
      // if user doesn't exists, create a new one
      if (email && lastName && firstName)
        await this.usersService.createGoogleUser({
          googleId,
          firstName,
          lastName,
          email,
        });
      console.error("google auth error", error);
    }
  }
}

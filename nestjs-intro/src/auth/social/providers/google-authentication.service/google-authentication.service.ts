import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";

import { TokenProvider } from "src/auth/auth-providers/token.provider";
import jwtConfig from "src/auth/config/jwt.config";
import { UserService } from "src/users/user-providers/user.service";
import { User } from "src/users/user.entity";
import { GoogleUserType } from "src/users/users-types/google-user.type";
import { GoogleTokenDto } from "../../social-dtos/google-token.dto";

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly tokenProvider: TokenProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(googleTokenDto: GoogleTokenDto) {
    const userPayload = await this.verifyToken(googleTokenDto);

    let user: User | undefined;
    try {
      // find user in DB
      user = await this.userService.findOneBy({
        googleId: userPayload.googleId,
      });
      // if user exists generate tokens
      return this.tokenProvider.generateTokens(user);
    } catch {
      // if user doesn't exists, create a new one
      if (userPayload.email && userPayload.firstName) {
        user = await this.userService.createGoogleUser(userPayload);
        return this.tokenProvider.generateTokens(user);
      }
      throw new InternalServerErrorException();
    }
  }

  private async verifyToken(
    googleTokenDto: GoogleTokenDto,
  ): Promise<GoogleUserType> {
    try {
      // verify the Google token
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // extract payload
      const payload = loginTicket.getPayload();
      if (!payload || !payload.email || !payload.given_name)
        throw new Error("No valid payload");

      return {
        googleId: payload.sub,
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name || "",
      };
    } catch {
      // token verification failed
      throw new UnauthorizedException();
    }
  }
}

import { Body, Controller, Post } from "@nestjs/common";
import { GoogleAuthenticationService } from "./providers/google-authentication.service/google-authentication.service";
import { GoogleTokenDto } from "./social-dtos/google-token.dto";
import { Auth } from "../auth-decorators/auth.decorator";
import { AuthType } from "../auth-enums/auth-type.enum";

@Controller("auth/google-authentication")
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthService: GoogleAuthenticationService,
  ) {}

  @Post()
  @Auth(AuthType.None)
  async authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    console.log("post auth executed");
    return await this.googleAuthService.authenticate(googleTokenDto);
  }
}

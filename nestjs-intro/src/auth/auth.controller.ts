import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Auth } from "./auth-decorators/auth.decorator";
import { RefreshTokenDto } from "./auth-dtos/refresh-token.dto";
import { SignInDto } from "./auth-dtos/signin.dto";
import { AuthType } from "./auth-enums/auth-type.enum";
import { AuthService } from "./auth-providers/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  @Auth(AuthType.None)
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post("refresh")
  async refreshTokes(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshTokes(refreshTokenDto);
  }
}

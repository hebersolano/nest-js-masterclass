import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignInDto } from "./auth-dtos/signin.dto";
import { AuthService } from "./auth-providers/auth.service";
import { Auth } from "./auth-decorators/auth.decorator";
import { AuthType } from "./auth-enums/auth-type.enum";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  @Auth(AuthType.None)
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
}

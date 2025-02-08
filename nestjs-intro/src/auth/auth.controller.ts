import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginDto } from './auth-dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = this.authService.login(email, password);
    return user;
  }
}

import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "src/users/user.module";
import { AuthService } from "./auth-providers/auth.service";
import { BcryptProvider } from "./auth-providers/bcrypt.provider";
import { AuthController } from "./auth.controller";
import { HashingProvider } from "./auth-providers/hashing.provider";
import jwtConfig from "./config/jwt.config";
import { TokenProvider } from "./auth-providers/token.provider";
import { GoogleAuthenticationController } from "./social/google-authentication.controller";
import { GoogleAuthenticationService } from "./social/providers/google-authentication.service/google-authentication.service";

@Module({
  providers: [
    {
      // When HashingProvider is use, BcryptProvider is inject instead
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    TokenProvider,
    GoogleAuthenticationService,
    AuthService,
  ],
  controllers: [AuthController, GoogleAuthenticationController],
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}

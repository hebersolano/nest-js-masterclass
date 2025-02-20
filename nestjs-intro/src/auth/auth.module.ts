import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "src/users/user.module";
import { AuthService } from "./auth-providers/auth.service";
import { BcryptProvider } from "./auth-providers/bcrypt.provider";
import { AuthController } from "./auth.controller";
import { HashingProvider } from "./auth-providers/hashing.provider";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    }, // When HashingProvider is use, BcryptProvider is inject instead
  ],
  exports: [AuthService, HashingProvider],
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => UserModule),
  ],
})
export class AuthModule {}

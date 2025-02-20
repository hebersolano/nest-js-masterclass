import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user-providers/user.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { ConfigModule } from "@nestjs/config";
import { CreateUserProvider } from "./user-providers/create.provider";
import profileConfig from "src/config/profile.config";
import { CreateManyUsersProvider } from "./user-providers/create-many.provider";

@Module({
  controllers: [UserController],
  providers: [UserService, CreateManyUsersProvider, CreateUserProvider],
  exports: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
  ],
})
export class UserModule {}

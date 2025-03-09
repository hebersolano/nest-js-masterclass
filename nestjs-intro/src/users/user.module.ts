import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import profileConfig from "src/config/profile.config";
import { CreateManyUsersProvider } from "./user-providers/create-many.provider";
import { CreateUserProvider } from "./user-providers/create.provider";
import { UserService } from "./user-providers/user.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { UserMg, UserMgSchema } from "./user.schema";
import { UserMgService } from "./user-providers/user.mg.service";
import { UserMgController } from "./user.mg.controller";

@Module({
  controllers: [UserController, UserMgController],
  providers: [
    UserService,
    CreateManyUsersProvider,
    CreateUserProvider,
    UserMgService,
  ],
  exports: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
    MongooseModule.forFeature([{ name: UserMg.name, schema: UserMgSchema }]),
  ],
})
export class UserModule {}

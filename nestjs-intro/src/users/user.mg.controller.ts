import { Body, Controller, Post } from "@nestjs/common";
import { Auth } from "src/auth/auth-decorators/auth.decorator";
import { AuthType } from "src/auth/auth-enums/auth-type.enum";
import { UserMgService } from "./user-providers/user.mg.service";
import { CreateUserDto } from "./user-dtos/create-user.dto";

@Controller("user.mg")
export class UserMgController {
  constructor(private readonly userMgService: UserMgService) {}
  @Post()
  @Auth(AuthType.None)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userMgService.createUser(createUserDto);
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { Auth } from "src/auth/auth-decorators/auth.decorator";
import { AuthType } from "src/auth/auth-enums/auth-type.enum";
import { CreateUserDto } from "./user-dtos/create-user.dto";
import { UserMgService } from "./user-providers/user.mg.service";

@Controller("user.mg")
@UseInterceptors(ClassSerializerInterceptor)
export class UserMgController {
  constructor(private readonly userMgService: UserMgService) {}

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return await this.userMgService.getUser(id);
  }

  @Get()
  async getUsers() {
    return await this.userMgService.getUsers();
  }

  @Post()
  @Auth(AuthType.None)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userMgService.createUser(createUserDto);
  }
}

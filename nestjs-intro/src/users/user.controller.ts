import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/auth-decorators/auth.decorator";
import { AuthType } from "src/auth/auth-enums/auth-type.enum";
import { CreateUserDto } from "./user-dtos/create-user.dto";
import { GetUserParamDto } from "./user-dtos/get-user-param.dto";
import { PatchUserDto } from "./user-dtos/patch-user.dto";
import { UserService } from "./user-providers/user.service";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags("Users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.userService.findAll(limit, page);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Fetches a list of registered users on the application",
  })
  @ApiResponse({
    status: 200,
    description: "Users fetched successfully base on the query",
  })
  @ApiQuery({
    name: "limit",
    type: "number",
    required: false,
    description: "The number of entries returned per query",
    example: 10,
  })
  @ApiQuery({
    name: "page",
    type: "number",
    required: false,
    description: "The position of the page number that you want",
    example: 10,
  })
  // @UseInterceptors(ClassSerializerInterceptor)
  async getUser(
    @Param() param: GetUserParamDto,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(limit, page);
    return await this.userService.findOneById(param.id);
  }

  @Post()
  // @UseInterceptors(ClassSerializerInterceptor)
  @Auth(AuthType.None)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post("create-many")
  async createManyUsers(
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    createUsersDto: CreateUserDto[],
  ) {
    return await this.userService.createMany(createUsersDto);
  }

  @Patch()
  updateUser(@Body() patchUserDto: PatchUserDto) {
    //TODO update user endpoint and implementation
    return JSON.stringify(patchUserDto);
  }

  //TODO delete user endpoint and implementation
}

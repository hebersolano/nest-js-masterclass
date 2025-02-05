import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './user-dtos/create-user.dto';
import { GetUserParamDto } from './user-dtos/get-user-param.dto';
import { PatchUserDto } from './user-dtos/patch-user.dto';
import { UserService } from './user-providers/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(limit, page);
  }

  @Get(':id')
  getUser(
    @Param() param: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(limit, page);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return JSON.stringify(createUserDto);
  }

  @Patch()
  updateUser(@Body() patchUserDto: PatchUserDto) {
    return JSON.stringify(patchUserDto);
  }
}

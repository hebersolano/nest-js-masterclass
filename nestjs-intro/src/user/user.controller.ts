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

@Controller('users')
export class UserController {
  @Get()
  getUsers() {
    return 'all users ';
  }

  @Get(':id')
  getUser(
    @Param() param: GetUserParamDto,
    @Query('limit', ParseIntPipe, new DefaultValuePipe(10)) query: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
  ) {
    console.log(query, page);
    return 'requesting user id:' + param.id;
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

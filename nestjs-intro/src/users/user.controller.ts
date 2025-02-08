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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
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
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully base on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The position of the page number that you want',
    example: 10,
  })
  getUser(
    @Param() param: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(limit, page);
    return this.userService.findOneById(param.id);
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

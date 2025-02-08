import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetPostParamsDto } from './posts-dtos/posts-params.dto';
import { PostsService } from './posts-providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './posts-dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {}

  @Get(':id')
  @ApiTags('Posts')
  getPost(@Param() params: GetPostParamsDto) {
    console.log(params);
    return this.postsService.findOne(params.id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log('>>> create post body', createPostDto);
  }
}

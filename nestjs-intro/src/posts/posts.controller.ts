import { Controller, Get, Param } from '@nestjs/common';
import { GetPostParamsDto } from './posts-dtos/posts-params.dto';
import { PostsService } from './posts-providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {}

  @Get(':id')
  getPost(@Param() params: GetPostParamsDto) {
    console.log(params);
    return this.postsService.findOne(params.id);
  }
}

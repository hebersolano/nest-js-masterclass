import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GetPostParamsDto } from './posts-dtos/posts-params.dto';
import { PostsService } from './posts-providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './posts-dtos/create-post.dto';
import { UpdatePostDto } from './posts-dtos/update-post.dto';

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

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'Get a 201 response if post created successfully',
  })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log('>>> create post body', createPostDto);
    return createPostDto;
  }

  @ApiOperation({ summary: 'Updates an existing blog post' })
  @ApiResponse({
    status: 200,
    description: '200 response if post is updated successfully',
  })
  @Patch()
  updatePost(@Body() updatePostDto: UpdatePostDto) {
    return updatePostDto;
  }
}

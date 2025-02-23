import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { GetPostParamsDto } from "./posts-dtos/posts-params.dto";
import { PostsService } from "./posts-providers/posts.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./posts-dtos/create-post.dto";
import { UpdatePostDto } from "./posts-dtos/update-post.dto";
import { GetPostsQueryDto } from "./posts-dtos/get-posts.dto";
import { ActiveUser } from "src/auth/auth-decorators/active-user.decorato";
import { UserData } from "src/auth/auth-interfaces/active-user.type";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(@Query() getPostsQuery: GetPostsQueryDto) {
    return await this.postsService.findAll(getPostsQuery);
  }

  @Get(":id")
  @ApiTags("Posts")
  async getPost(@Param() params: GetPostParamsDto) {
    console.log(params);
    return await this.postsService.findOne(params.id);
  }

  @ApiOperation({
    summary: "Creates a new blog post",
  })
  @ApiResponse({
    status: 201,
    description: "Get a 201 response if post created successfully",
  })
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: UserData,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @ApiOperation({ summary: "Updates an existing blog post" })
  @ApiResponse({
    status: 200,
    description: "200 response if post is updated successfully",
  })
  @Patch()
  async updatePost(@Body() updatePostDto: UpdatePostDto) {
    console.log(">>> update post body", updatePostDto);
    return await this.postsService.update(updatePostDto);
  }

  @Delete()
  async deletePost(@Query("id", ParseIntPipe) id: number) {
    return await this.postsService.delete(id);
  }
}

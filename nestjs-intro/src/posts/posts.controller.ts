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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ActiveUser } from "src/auth/auth-decorators/active-user.decorato";
import { ActiveUserData } from "src/auth/auth-interfaces/active-user.type";
import { CreatePostDto } from "./posts-dtos/create-post.dto";
import { GetPostsQueryDto } from "./posts-dtos/get-posts.dto";
import { GetPostParamsDto } from "./posts-dtos/posts-params.dto";
import { UpdatePostDto } from "./posts-dtos/update-post.dto";
import { PostsService } from "./posts-providers/posts.service";

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
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.postsService.create(createPostDto, activeUser);
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

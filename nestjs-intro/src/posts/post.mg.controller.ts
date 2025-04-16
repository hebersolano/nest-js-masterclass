import { Body, Controller, Get, Post } from "@nestjs/common";
import { PostMgService } from "./posts-providers/post.mg.service";
import { CreatePostMgDto } from "./posts-dtos/create-post.mg.dto";

@Controller("post.mg")
export class PostMgController {
  constructor(private readonly postMgService: PostMgService) {}

  @Get()
  async getPosts() {
    return await this.postMgService.getPosts();
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostMgDto) {
    return await this.postMgService.createPost(createPostDto);
  }
}

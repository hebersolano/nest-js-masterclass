import { Body, Controller, Get, Post } from "@nestjs/common";
import { TagMgService } from "./tags-providers/tag.mg.service";
import { CreateTagMgDto } from "./tags-dtos/create.mg.dto";

@Controller("tag.mg")
export class TagMgController {
  constructor(private readonly tagMgService: TagMgService) {}

  @Get()
  async getTags() {
    return await this.tagMgService.getPosts();
  }

  @Post()
  async createTag(@Body() createTagDto: CreateTagMgDto) {
    return this.tagMgService.createTag(createTagDto);
  }
}

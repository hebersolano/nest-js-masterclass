import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDto } from './tags-dtos/create-tag.dto';
import { TagsService } from './tags-providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags() {
    return await this.tagsService.findAll();
  }

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.create(createTagDto);
  }
}

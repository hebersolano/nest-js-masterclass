import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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

  @Delete()
  async softDeleteTag(@Query('id', ParseIntPipe) id: number) {
    await this.tagsService.softDelete(id);
  }

  @Delete('hard-delete')
  async deleteTag(@Query('id', ParseIntPipe) id: number) {
    await this.tagsService.delete(id);
  }
}

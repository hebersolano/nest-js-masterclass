import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetMetaOptionParamsDto } from './meta-options-dtos/get-meta-option.dto';
import { MetaOptionsService } from './meta-options-providers/meta-options.service';
import { CreateMetaOptionDto } from './meta-options-dtos/meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Get(':id')
  getMetaOption(@Param() params: GetMetaOptionParamsDto) {
    return this.metaOptionsService.findOne(params.id);
  }

  @Post()
  async createMetaOption(@Body() CreateMetaOptionDto: CreateMetaOptionDto) {
    await this.metaOptionsService.create(CreateMetaOptionDto);
  }
}

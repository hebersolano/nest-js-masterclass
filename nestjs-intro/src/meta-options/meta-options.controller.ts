import { Controller, Get, Post } from '@nestjs/common';

@Controller('meta-options')
export class MetaOptionsController {
  @Get()
  getMetaOption() {}

  @Post()
  createMetaOption() {}
}

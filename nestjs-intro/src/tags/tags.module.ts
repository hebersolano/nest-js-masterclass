import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./tags-entities/tag.entity";
import { TagsService } from "./tags-providers/tags.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TagMg, TagMgSchema } from "./tags-entities/tags.schema";
import { TagMgService } from "./tags-providers/tag.mg.service";
import { TagMgController } from "./tag.mg.controller.controller";

@Module({
  controllers: [TagsController, TagMgController],
  imports: [
    TypeOrmModule.forFeature([Tag]),
    MongooseModule.forFeature([{ name: TagMg.name, schema: TagMgSchema }]),
  ],
  providers: [TagsService, TagMgService],
  exports: [TagsService],
})
export class TagsModule {}

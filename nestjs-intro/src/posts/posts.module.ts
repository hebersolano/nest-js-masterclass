import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { UserModule } from "src/users/user.module";
import { Post } from "./post-entities/post.entity";
import { PostsService } from "./posts-providers/posts.service";
import { PostsController } from "./posts.controller";
import { TagsModule } from "src/tags/tags.module";
import { MongooseModule } from "@nestjs/mongoose";
import { PostMg, PostMgSchema } from "./post.schema";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    UserModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
    MongooseModule.forFeature([{ name: PostMg.name, schema: PostMgSchema }]),
  ],
})
export class PostsModule {}

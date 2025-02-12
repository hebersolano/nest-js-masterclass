import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UserModule } from 'src/users/user.module';
import { Post } from './post-entities/post.entity';
import { PostsService } from './posts-providers/posts.service';
import { PostsController } from './posts.controller';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [UserModule, TypeOrmModule.forFeature([Post, MetaOption])],
})
export class PostsModule {}

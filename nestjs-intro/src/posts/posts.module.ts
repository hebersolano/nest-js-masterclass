import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts-providers/posts.service';
import { UserModule } from 'src/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post-entities/post.entity';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [UserModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}

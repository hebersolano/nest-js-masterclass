import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts-providers/posts.service';
import { UserModule } from 'src/users/user.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [UserModule],
})
export class PostsModule {}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Mutation(() => Post)
  createPost(@Args('postInput') postInput: CreatePostDto) {
    return this.postsService.create(postInput);
  }
}

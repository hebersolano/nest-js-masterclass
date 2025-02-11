import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user-providers/user.service';
import { Repository } from 'typeorm';
import { Post } from '../post-entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../posts-dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,

    // Repositories
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  findOne(id: number) {
    const user = this.usersService.findAll();
  }

  async create(createPostDto: CreatePostDto) {
    // create post entry and add meta option to the post
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }
}

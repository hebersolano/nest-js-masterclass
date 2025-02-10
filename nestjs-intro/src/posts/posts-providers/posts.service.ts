import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user-providers/user.service';
import { Repository } from 'typeorm';
import { Post } from '../post-entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,
    // Repositories
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findOne(id: number) {
    // find a user
    const user = this.usersService.findAll();

    return [
      {
        title: 'Title 01',
        content: 'Some text',
        author: user,
        authorId: id,
      },
    ];
  }
}

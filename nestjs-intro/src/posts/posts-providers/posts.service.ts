import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user-providers/user.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UserService) {}

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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UserService } from 'src/users/user-providers/user.service';
import { Repository } from 'typeorm';
import { Post } from '../post-entities/post.entity';
import { CreatePostDto } from '../posts-dtos/create-post.dto';

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

  async findAll() {
    await this.postRepository.find({});
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });
  }

  async create(createPostDto: CreatePostDto) {
    // check if author user exist
    const user = await this.usersService.findOneById(createPostDto.authorId);

    let newPost = this.postRepository.create(createPostDto);
    newPost = await this.postRepository.save(newPost);
    await this.postRepository
      .createQueryBuilder()
      .relation('author')
      .of(newPost.id)
      .set(user?.id);

    return newPost;
  }

  async delete(id: number) {
    await this.postRepository.delete(id);

    return { ok: true, id };
  }
}

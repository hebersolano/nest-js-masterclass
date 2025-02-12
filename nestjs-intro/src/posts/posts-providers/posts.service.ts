import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UserService } from 'src/users/user-providers/user.service';
import { Repository } from 'typeorm';
import { Post } from '../post-entities/post.entity';
import { CreatePostDto } from '../posts-dtos/create-post.dto';
import { UpdatePostDto } from '../posts-dtos/update-post.dto';

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
        tags: true,
      },
      select: {
        tags: {
          name: true,
          id: true,
        },
      },
    });
  }

  async create(createPostDto: CreatePostDto) {
    const post = { ...createPostDto, tags: undefined }; // to avoid type error on postRepo create
    // check if author user exist
    const isUser = await this.usersService.exists(createPostDto.authorId);

    if (!isUser) throw new Error('User not exists');

    let newPost = this.postRepository.create(post);
    newPost = await this.postRepository.save(newPost);

    // set author and tags relation
    await Promise.all([
      this.postRepository
        .createQueryBuilder()
        .relation('author')
        .of(newPost.id)
        .set(createPostDto.authorId),
      this.postRepository
        .createQueryBuilder()
        .relation('tags')
        .of(newPost.id)
        .add(createPostDto.tags),
    ]);

    return newPost;
  }

  async update(updatePostDto: UpdatePostDto) {
    const { id: postId } = updatePostDto;
    const fieldsToUpdate = {
      ...updatePostDto,
      id: undefined,
      tags: undefined,
      author: undefined,
      authorId: undefined,
      metaOptions: undefined,
    };
    //check weather post and tags exist
    // update post
    await this.postRepository
      .createQueryBuilder()
      .update()
      .set(fieldsToUpdate)
      .where('id = :id', { id: postId })
      .execute();
    console.log(updatePostDto);

    await this.postRepository
      .createQueryBuilder()
      .relation('tags')
      .of(postId)
      .add(updatePostDto.tags);

    return {
      ok: true,
      id: postId,
    };
  }

  async delete(id: number) {
    await this.postRepository.delete(id);

    return { ok: true, id };
  }
}

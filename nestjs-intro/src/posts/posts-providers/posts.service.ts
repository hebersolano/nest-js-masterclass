import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UserService } from 'src/users/user-providers/user.service';
import { Repository } from 'typeorm';
import { Post } from '../post-entities/post.entity';
import { CreatePostDto } from '../posts-dtos/create-post.dto';
import { UpdatePostDto } from '../posts-dtos/update-post.dto';
import { TagsService } from 'src/tags/tags-providers/tags.service';
import { HelpersService } from 'src/helpers/helpers-providers/helpers.service';
import { Tag } from 'src/tags/tags-entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,
    private readonly tagsService: TagsService,
    private readonly helpersService: HelpersService,

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
    // find post
    let post = await this.postRepository.findOne({
      where: { id: updatePostDto.id },
    });
    if (!post) throw new Error('Post not found');

    // update the properties
    post = this.helpersService.updateObjectFromSource<Post>(
      post,
      updatePostDto,
      ['id', 'tags', 'metaOptions', 'author'],
    );

    let tags: Tag[] = [];
    if (updatePostDto.tags) {
      // find tags
      if (updatePostDto.tags.length > 0)
        tags = await this.tagsService.findMultipleTags(updatePostDto.tags);
      // assign new tags
      post.tags = tags;
    }

    // save post
    const updatedPost = await this.postRepository.save(post);

    return {
      ok: true,
      result: updatedPost,
    };
  }

  async delete(id: number) {
    await this.postRepository.delete(id);

    return { ok: true, id };
  }
}

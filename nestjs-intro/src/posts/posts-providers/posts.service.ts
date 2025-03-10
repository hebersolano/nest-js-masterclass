import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HelpersService } from "src/helpers/helpers-providers/helpers.service";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { Tag } from "src/tags/tags-entities/tag.entity";
import { TagsService } from "src/tags/tags-providers/tags.service";
import { UserService } from "src/users/user-providers/user.service";
import { Repository } from "typeorm";
import { Post } from "../post-entities/post.entity";
import { CreatePostDto } from "../posts-dtos/create-post.dto";
import { UpdatePostDto } from "../posts-dtos/update-post.dto";
import { GetPostsQueryDto } from "../posts-dtos/get-posts.dto";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";
import { ActiveUserData } from "src/auth/auth-interfaces/active-user.type";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,
    private readonly tagsService: TagsService,
    private readonly helpersService: HelpersService,
    private readonly paginationProvider: PaginationProvider,

    // Repositories
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  async findAll(getPostsQuery: GetPostsQueryDto): Promise<Paginated<Post>> {
    return await this.paginationProvider.paginateQuery(
      getPostsQuery,
      this.postRepository,
    );
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        author: true,
        tags: true,
      },
    });
  }

  async create(createPostDto: CreatePostDto, activeUser: ActiveUserData) {
    const post = { ...createPostDto, tags: undefined }; // to avoid type error on postRepo create
    // check if author user exist
    const userExists = await this.usersService.existsBy({
      id: createPostDto.authorId,
    });
    if (!userExists) throw new BadRequestException("Author doesn't exists");

    let newPost = this.postRepository.create(post);
    // set author and tags relation
    if (createPostDto.tags && createPostDto.tags.length > 0) {
      const tags = await this.tagsService.findMultipleTags(createPostDto.tags);
      if (createPostDto.tags.length !== tags.length) {
        const tagsNotFound = createPostDto.tags.filter((id, i) =>
          tags[i] && id === tags[i].id ? false : true,
        );
        throw new BadRequestException(
          "Tags doesn't exist: [" + tagsNotFound.toString() + "]",
        );
      }
      newPost.tags = tags;
    }

    try {
      newPost = await this.postRepository.save(newPost);
      await this.postRepository
        .createQueryBuilder()
        .relation("author")
        .of(activeUser.userId)
        .set(createPostDto.authorId);
      return newPost;
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      throw new RequestTimeoutException(
        "Unable to process request, please try again",
        { description: error.name + ": " + error.message },
      );
    }
  }

  async update(updatePostDto: UpdatePostDto) {
    // find post
    let post = await this.postRepository.findOne({
      where: { id: updatePostDto.id },
    });
    if (!post) throw new Error("Post not found");

    // update the properties
    post = this.helpersService.updateObjectFromSource<Post>(
      post,
      updatePostDto,
      ["id", "tags", "metaOptions", "author"],
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

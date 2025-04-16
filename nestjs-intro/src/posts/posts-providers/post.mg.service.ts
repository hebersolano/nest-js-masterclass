import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostMg } from "../post-entities/post.schema";
import { Model } from "mongoose";
import { CreatePostMgDto } from "../posts-dtos/create-post.mg.dto";

@Injectable()
export class PostMgService {
  constructor(
    @InjectModel(PostMg.name)
    private readonly postModel: Model<PostMg>,
  ) {}

  async getPosts() {
    const result = await this.postModel
      .find({})
      .populate(["tags", "author"])
      .exec();
    return result.map((obj) => obj.toObject({ flattenObjectIds: true }));
  }

  async createPost(createPostDto: CreatePostMgDto) {
    const newPost = new this.postModel(createPostDto);
    return await newPost.save();
  }
}

import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { TagMg } from "../tags-entities/tags.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTagMgDto } from "../tags-dtos/create.mg.dto";

@Injectable()
export class TagMgService {
  constructor(
    @InjectModel(TagMg.name)
    private readonly tagModel: Model<TagMg>,
  ) {}

  async getPosts() {
    const result = await this.tagModel.find({}).exec();
    return result.map((obj) => obj.toObject({ flattenObjectIds: true }));
  }

  async createTag(createTagDto: CreateTagMgDto) {
    const newTag = new this.tagModel(createTagDto);
    return await newTag.save();
  }
}

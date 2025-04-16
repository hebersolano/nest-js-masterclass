import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { PostType, Status } from "../posts-types/create-post.enum";
import { UserMg } from "src/users/user-entities/user.schema";
import { TagMg } from "src/tags/tags-entities/tags.schema";

@Schema()
export class PostMg extends Document {
  @Prop({ type: String, isRequired: true })
  title: string;

  @Prop({
    type: String,
    isRequired: true,
    enum: PostType,
    default: PostType.post,
  })
  postType: PostType;

  @Prop({ type: String, isRequired: true })
  slug: string;

  @Prop({ type: String, isRequired: true, enum: Status, default: Status.draft })
  status: Status;

  @Prop({ type: String, isRequired: false })
  content?: string;

  @Prop({ type: String, isRequired: false })
  featuredImageUrl?: string;

  @Prop({ type: Date, isRequired: false })
  publishOn?: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserMg.name })
  author: UserMg;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: TagMg.name }] })
  tags?: TagMg[];
}

export const PostMgSchema = SchemaFactory.createForClass(PostMg);

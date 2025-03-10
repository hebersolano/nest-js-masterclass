import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { PostType, Status } from "./posts-types/create-post.enum";

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
}

export const PostMgSchema = SchemaFactory.createForClass(PostMg);

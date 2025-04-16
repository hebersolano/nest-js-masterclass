import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class TagMg extends Document {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String, isRequired: true })
  name: string;

  @Prop({ type: String, isRequired: true })
  slug: string;

  @Prop({ type: String, isRequired: false })
  description?: string;
}

export const TagMgSchema = SchemaFactory.createForClass(TagMg);

import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { CreateMetaOptionDto } from "src/meta-options/meta-options-dtos/meta-options.dto";
import { PostType, Status } from "../posts-types/create-post.enum";

export class CreatePostMgDto {
  @Length(3, 512)
  @IsNotEmpty()
  title: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @Matches(/^[a-z09]+(?:-[a-z0-9]+)*$/, {
    message: 'Only lowercase letters and hyphens ("-") are allowed.',
  })
  @Length(3, 256)
  @IsNotEmpty()
  slug: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsString()
  @IsOptional()
  content?: string;

  @IsJSON()
  @IsOptional()
  schema?: string;

  @MaxLength(1024)
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @IsDate()
  @IsOptional()
  publishOn?: Date;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @Type(() => CreateMetaOptionDto)
  @ValidateNested()
  @IsOptional()
  metaOptions?: CreateMetaOptionDto | undefined;

  @IsString()
  @IsNotEmpty()
  author: string;
}

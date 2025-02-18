import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
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

export class CreatePostDto {
  @ApiProperty({ description: "Title for the post", example: "Example title" })
  @Length(3, 512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostType,
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    example: "my-post",
  })
  @Matches(/^[a-z09]+(?:-[a-z0-9]+)*$/, {
    message: 'Only lowercase letters and hyphens ("-") are allowed.',
  })
  @Length(3, 256)
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiPropertyOptional({
    description: "Content of the post",
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: "Serialize your JSON object",
    example: '{\n  "key": "value" \n}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional()
  @MaxLength(1024)
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    example: "2025-02-08T14:57:22.251Z",
  })
  @IsDate()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({ example: [1, 2] })
  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  tags?: number[];

  @ApiPropertyOptional({
    type: "object",
    properties: {
      metaValue: {
        type: "string",
        description: "JSON string",
        example: '{\n  "sidebarEnable": true \n}',
      },
    },
  })
  @Type(() => CreateMetaOptionDto)
  @ValidateNested()
  @IsOptional()
  metaOptions?: CreateMetaOptionDto | undefined;

  @ApiProperty({
    type: "integer",
    required: true,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}

import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum PostType {
  post = 'post',
  page = 'page',
  story = 'story',
  series = 'series',
}

enum Status {
  draft = 'draft',
  schedule = 'schedule',
  review = 'review',
  published = 'published',
}

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @IsNotEmpty()
  slug: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsOptional()
  content?: string;

  @IsOptional()
  schema?: string;

  @IsOptional()
  featuredImageUrl?: string;

  @IsDate()
  @IsOptional()
  publishOn?: Date;

  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  tags: string[];

  metaOptions: [{ key: any }];
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType, Status } from '../posts-types/create-post.enum';
import { MetaOptionsDto } from 'src/meta-options/meta-options.dto';

export class CreatePostDto {
  @ApiProperty({ description: 'Title for the post', example: 'Example title' })
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
    example: 'my-post',
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
    description: 'Content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'Serialize your JSON object',
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
    example: '2025-02-08T14:57:22.251Z',
  })
  @IsDateString()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({ example: ['tag01', 'tag02'] })
  @MinLength(3, { each: true })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        value: { type: 'any', example: true },
      },
    },
  })
  @Type(() => MetaOptionsDto)
  @ValidateNested()
  @IsArray()
  @IsOptional()
  metaOptions?: MetaOptionsDto[];
}

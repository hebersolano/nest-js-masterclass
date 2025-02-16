import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from "class-validator";

export class CreateTagDto {
  @ApiProperty()
  @Length(3, 256)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Matches(/^[a-z09]+(?:-[a-z0-9]+)*$/, {
    message: 'Only lowercase letters and hyphens ("-") are allowed.',
  })
  @Length(3, 256)
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional()
  @MaxLength(1024)
  @IsUrl()
  @IsOptional()
  featureImageUrl?: string;
}

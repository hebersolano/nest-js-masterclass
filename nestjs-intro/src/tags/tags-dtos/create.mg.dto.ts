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

export class CreateTagMgDto {
  @Length(3, 256)
  @IsNotEmpty()
  name: string;

  @Matches(/^[a-z09]+(?:-[a-z0-9]+)*$/, {
    message: 'Only lowercase letters and hyphens ("-") are allowed.',
  })
  @Length(3, 256)
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsJSON()
  @IsOptional()
  schema?: string;

  @MaxLength(1024)
  @IsUrl()
  @IsOptional()
  featureImageUrl?: string;
}

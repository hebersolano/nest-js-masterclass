import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateMetaOptionDto {
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}

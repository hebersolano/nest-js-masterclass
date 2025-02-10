import { IsJSON, IsNotEmpty } from 'class-validator';

export class MetaOptionsDto {
  @IsJSON()
  @IsNotEmpty()
  metaValue: JSON;
}

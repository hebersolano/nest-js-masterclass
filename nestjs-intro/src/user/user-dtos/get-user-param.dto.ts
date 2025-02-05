import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
export class GetUserParamDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}

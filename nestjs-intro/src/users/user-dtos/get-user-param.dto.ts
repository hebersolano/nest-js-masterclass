import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserParamDto {
  @ApiPropertyOptional({
    description: "Get user with a specific id",
    example: 1234,
  }) // swagger docs
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}

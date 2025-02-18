import { IntersectionType } from "@nestjs/swagger";
import { IsDate, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/pagination-dtos/pagination-query.dto";

class GetPostBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetPostsQueryDto extends IntersectionType(
  GetPostBaseDto,
  PaginationQueryDto,
) {}

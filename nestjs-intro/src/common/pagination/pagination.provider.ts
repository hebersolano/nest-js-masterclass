import { Injectable } from "@nestjs/common";
import { PaginationQueryDto } from "./pagination-dtos/pagination-query.dto";
import { ObjectLiteral, Repository } from "typeorm";

@Injectable()
export class PaginationProvider {
  async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const results = await repository.find({
      take: paginationQuery.limit,
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
    });

    return results;
  }
}

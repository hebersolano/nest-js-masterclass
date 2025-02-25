import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateUserDto } from "../user-dtos/create-user.dto";
import { User } from "../user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class CreateManyUsersProvider {
  constructor(private readonly dataSource: DataSource) {}

  async createManyUsers(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    // create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // connect query runner to db
      await queryRunner.connect();
      // start transaction
      await queryRunner.startTransaction();
    } catch {
      throw new RequestTimeoutException("Database connection error");
    }
    try {
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // if successful commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      let errorMsg = "Request could not be complete";
      if (error instanceof Error) errorMsg += ": " + error.message;
      // if unsuccessful rollback transaction
      await queryRunner.rollbackTransaction();
      throw new ConflictException(errorMsg);
    } finally {
      // release connection
      queryRunner.release().catch(() => {
        throw new RequestTimeoutException("Error releasing the DB connection");
      });
    }

    return newUsers;
  }
}

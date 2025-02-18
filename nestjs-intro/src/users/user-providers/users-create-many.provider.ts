import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../user-dtos/create-user.dto";
import { User } from "../user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  async createMany(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    // create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    // connect query runner to db
    await queryRunner.connect();
    // start transaction
    await queryRunner.startTransaction();
    try {
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // if successful commit transaction
      await queryRunner.commitTransaction();
    } catch {
      // if unsuccessful rollback transaction
      await queryRunner.rollbackTransaction();
    } finally {
      // release connection
      await queryRunner.release();
    }

    return newUsers;
  }
}

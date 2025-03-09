import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserMg } from "../user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "../user-dtos/create-user.dto";

@Injectable()
export class UserMgService {
  constructor(
    @InjectModel(UserMg.name)
    private readonly userModel: Model<UserMg>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }
}

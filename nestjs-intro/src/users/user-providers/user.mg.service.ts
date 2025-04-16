import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserMg } from "../user-entities/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "../user-dtos/create-user.dto";

@Injectable()
export class UserMgService {
  constructor(
    @InjectModel(UserMg.name)
    private readonly userModel: Model<UserMg>,
  ) {}

  async getUser(id: string) {
    const res = await this.userModel.findById(id).exec();
    return res?.toObject({ flattenObjectIds: true });
  }

  async getUsers() {
    const res = await this.userModel.find({}).exec();
    return res.map((obj) => obj.toObject({ flattenObjectIds: true }));
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }
}

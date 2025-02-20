import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserDto } from "../user-dtos/create-user.dto";
import { User } from "../user.entity";
import { HashingProvider } from "src/auth/auth-providers/hashing.provider";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CreateUserProvider {
  constructor(
    // repositories
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    // Check if user exist
    let userExists: boolean = false;
    try {
      userExists = await this.userRepository.existsBy({
        email: createUserDto.email,
      });
    } catch {
      throw new RequestTimeoutException(
        "Unable to process request at the moment, please try later",
        { description: "Database connection error" },
      );
    }
    if (userExists) throw new BadRequestException("User already exists");

    // Create a new user
    createUserDto.password = await this.hashingProvider.hashPassword(
      createUserDto.password,
    );
    try {
      let newUser = this.userRepository.create(createUserDto);
      newUser = await this.userRepository.save(newUser);
      return newUser;
    } catch {
      throw new RequestTimeoutException(
        "Unable to process request at the moment, please try later",
        { description: "Database connection error" },
      );
    }
  }
}

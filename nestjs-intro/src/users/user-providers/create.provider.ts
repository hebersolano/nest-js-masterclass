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
import { GoogleUserType } from "../users-types/google-user.type";
import { MailService } from "src/mail/mail-providers/mail.service";

@Injectable()
export class CreateUserProvider {
  constructor(
    // repositories
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly mailService: MailService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    // Check if user exist
    let userExists: boolean = false;
    try {
      userExists = await this.userRepository.existsBy({
        email: createUserDto.email,
      });
    } catch (error) {
      console.error("", error);
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

      //TODO: mail service implementation
      // await this.mailService.sendUserWelcome(newUser);

      return newUser;
    } catch (error) {
      console.error(">>> create user error", error);
      throw new RequestTimeoutException(
        "Unable to process request at the moment, please try later",
        { description: "Database connection error" },
      );
    }
  }

  async createGoogleUser(googleUserData: GoogleUserType): Promise<User> {
    try {
      // Check if user exist
      const user = await this.userRepository.findOneBy({
        email: googleUserData.email,
      });
      if (user) {
        // if user exist by email, update googleId
        user.googleId = googleUserData.googleId;
        return await this.userRepository.save(user);
      } else {
        // create a new user
        const newUser = this.userRepository.create(googleUserData);
        return await this.userRepository.save(newUser);
      }
    } catch {
      throw new RequestTimeoutException(
        "Unable to process request at the moment, please try later",
        { description: "Database connection error" },
      );
    }
  }
}

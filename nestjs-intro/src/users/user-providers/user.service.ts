import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/providers/auth.service";
import profileConfig from "src/config/profile.config";
import { DataSource, Repository } from "typeorm";
import { CreateUserDto } from "../user-dtos/create-user.dto";
import { User } from "../user.entity";
import { UsersCreateManyProvider } from "./users-create-many.provider";

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UserService {
  constructor(
    // circular dependency  UserService <=> AuthService
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // repositories
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly dataSource: DataSource,

    // configuration modules
    private readonly configService: ConfigService,
    @Inject(profileConfig.KEY) // custom config module
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    // sub-providers
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}

  /**
   * Method to get all the users from the database
   */
  async findAll(limit?: number, page?: number) {
    console.log(limit, page);
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error(">>> Error user service findAll", error);
      throw new RequestTimeoutException(
        "Unable to process request at the moment, please try later",
        { description: "Database connection error" },
      );
    }
  }

  /**
   * Find a single user by id
   */
  async findOneById(id: number) {
    let user: User | null = null;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      console.error(">>> Error user service findOneById", error, id);
      throw new RequestTimeoutException(
        "Unable to process request at the moment, please try later",
        { description: "Database connection error" },
      );
    }
    if (!user) throw new BadRequestException("User does not exists");
    return user;
  }

  async create(createUserDto: CreateUserDto) {
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

  async createMany(createUsersDto: CreateUserDto[]) {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }

  async exists(id: number) {
    try {
      return await this.userRepository.existsBy({ id });
    } catch {
      throw new RequestTimeoutException(
        "Unable to process request at the moment, please try later",
        { description: "Database connection error" },
      );
    }
  }
}

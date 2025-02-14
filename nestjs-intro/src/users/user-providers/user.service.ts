import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user-dtos/create-user.dto';
import { User } from '../user.entity';
import { ConfigService } from '@nestjs/config';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    // circular dependency  UserService <=> AuthService
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // injecting userRepository
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Method to get all the users from the database
   */
  findAll(limit?: number, page?: number) {
    const env = this.configService.get<string>('S3_BUCKET');
    console.log('>>> env config', env);
    console.log(limit, page);
    return [{ firsName: 'john', email: 'example@mail.com' }];
  }

  /**
   * Find a single user by id
   */
  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(createUserDto: CreateUserDto) {
    // Check if user exist
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    console.log('>>> existing user', existingUser);
    // Handle exceptions

    // Create a new user
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  async exists(id: number) {
    return await this.userRepository.existsBy({ id });
  }
}

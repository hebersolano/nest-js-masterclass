import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../user-dtos/create-user.dto';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UserService {
  constructor(
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
    console.log(limit, page);
    return [{ firsName: 'john', email: 'example@mail.com' }];
  }

  /**
   * Find a single user by id
   */
  findOneById(id: number) {
    if (this.authService.isAuth()) console.log('user is authenticated');
    return { id, name: 'Heber', email: 'example@mail.com' };
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
}

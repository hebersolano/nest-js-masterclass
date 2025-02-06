import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user-providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    // injecting users service, circular dependency
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
  ) {}

  login(email: string, password: string, id: string) {
    console.log(email, password, id);
    // check user exists database
    const user = this.usersService.findAll();
    // login
    // token
    return user;
  }

  isAuth() {
    return true;
  }
}

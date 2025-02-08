import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UserService {
  constructor(
    // circular dependency  UserService <=> AuthService
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findAll(limit?: number, page?: number) {
    console.log(limit, page);
    return [{ firsName: 'john', email: 'example@mail.com' }];
  }

  findOneById(id: number) {
    if (this.authService.isAuth()) console.log('user is authenticated');
    return { id, name: 'Heber', email: 'example@mail.com' };
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll(limit: number, page: number) {
    console.log(limit, page);
    return [{ firsName: 'john', email: 'example@mail.com' }];
  }
}

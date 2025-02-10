import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

console.log('>>db password', process.env.DB_USER_PASSWORD);

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  imports: [],
  inject: [],
  useFactory: () => ({
    type: 'postgres',
    entities: [User],
    synchronize: true,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
  }),
};

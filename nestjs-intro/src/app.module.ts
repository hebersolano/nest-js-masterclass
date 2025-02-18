import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { UserModule } from "./users/user.module";
import { TagsModule } from "./tags/tags.module";
import { MetaOptionsModule } from "./meta-options/meta-options.module";
import { HelpersModule } from "./helpers/helpers.module";
import { ConfigModule } from "@nestjs/config";
import { typeOrmOptions } from "./config/type-orm-module.config";
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import envValidation from "./config/env.validation";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync(typeOrmOptions),
    UserModule,
    PostsModule,
    AuthModule,
    TagsModule,
    MetaOptionsModule,
    HelpersModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

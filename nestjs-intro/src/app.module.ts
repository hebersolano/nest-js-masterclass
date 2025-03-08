import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PaginationModule } from "./common/pagination/pagination.module";
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import envValidation from "./config/env.validation";
import { typeOrmOptions } from "./config/type-orm-module.config";
import { HelpersModule } from "./helpers/helpers.module";
import { MetaOptionsModule } from "./meta-options/meta-options.module";
import { PostsModule } from "./posts/posts.module";
import { TagsModule } from "./tags/tags.module";
import { UserModule } from "./users/user.module";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AccessTokenGuard } from "./auth/auth-guards/access-token/access-token.guard";
import jwtConfig from "./auth/config/jwt.config";
import { AuthenticationGuard } from "./auth/auth-guards/authentication/authentication.guard";
import { DataResponseInterceptor } from "./common/interceptors/data-response/data-response.interceptor";
import { UploadsModule } from "./uploads/uploads.module";
import { MailModule } from "./mail/mail.module";
import { MongooseModule } from "@nestjs/mongoose";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: envValidation,
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmOptions),
    MongooseModule.forRoot("mongodb://localhost:27017/", {
      dbName: "nestjs-blog",
    }),
    UploadsModule,
    UserModule,
    PostsModule,
    AuthModule,
    TagsModule,
    MetaOptionsModule,
    HelpersModule,
    PaginationModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_INTERCEPTOR, useClass: DataResponseInterceptor },
    AccessTokenGuard,
  ],
})
export class AppModule {}

import { ConfigModule, ConfigService } from "@nestjs/config";
import type { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: "postgres",
    // entities: [__dirname + "/../**/*.entity.ts"],
    autoLoadEntities: configService.get("database.ormAutoLoadEntities"),
    synchronize: configService.get("database.ormSynchronize"),

    host: configService.get("database.host"),
    port: configService.get("database.port"),
    username: configService.get("database.username"),
    password: configService.get("database.password"),
    database: configService.get("database.name"),
  }),
};

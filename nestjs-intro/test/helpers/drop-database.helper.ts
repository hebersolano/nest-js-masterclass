import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export async function dropDatabase(configService: ConfigService) {
  // create connection
  const appDataSource = await new DataSource({
    type: "postgres",
    synchronize: configService.get("database.ormSynchronize"),
    host: configService.get("database.host"),
    port: configService.get("database.port"),
    username: configService.get("database.username"),
    password: configService.get("database.password"),
    database: configService.get("database.name"),
  }).initialize();
  // drop all tables
  await appDataSource.dropDatabase();
  // close connection
  await appDataSource.destroy();
}

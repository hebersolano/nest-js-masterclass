import { registerAs } from "@nestjs/config";

export default registerAs("database", () => {
  return {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_USER_PASSWORD,
    name: process.env.DB_DATABASE_NAME,
    ormSynchronize: process.env.ORM_SYNC === "true" ? true : false,
    ormAutoLoadEntities: process.env.ORM_AUTOLOAD === "true" ? true : false,
  };
});

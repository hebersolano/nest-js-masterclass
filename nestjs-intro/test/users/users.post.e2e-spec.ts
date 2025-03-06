import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { App } from "supertest/types";
import { bootstrapNestApp } from "test/helpers/bootstrap-nest-app.helper";
import { dropDatabase } from "test/helpers/drop-database.helper";
import * as request from "supertest";

describe("[User] @Post Endpoints", () => {
  let app: INestApplication<App>;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    app = await bootstrapNestApp();
    config = app.get(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it("/users - Endpoint is public", async () => {
    return request(httpServer)
      .post("/users")
      .send({})
      .expect(400)
      .then(({ body }) => {
        console.log("data rest test", body);
      });
  });
  it.todo("/users - firstName is mandatory");
  it.todo("/users - email is mandatory");
  it.todo("/users - password is mandatory");
  it.todo("/users - valid request successfully creates user");
  it.todo("/users - password is not returned in response");
  it.todo("/users - googleId is not returned in response");
});

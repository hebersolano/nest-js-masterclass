import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { App } from "supertest/types";
import { bootstrapNestApp } from "test/helpers/bootstrap-nest-app.helper";
import { dropDatabase } from "test/helpers/drop-database.helper";
import * as request from "supertest";
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from "./users.post.sample-data";

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

  it("/users - endpoint is public", () => {
    return request(httpServer).post("/users").send({}).expect(400);
  });
  it("/users - firstName is mandatory", () => {
    return request(httpServer)
      .post("/users")
      .send(missingFirstName)
      .expect(400);
  });
  it("/users - email is mandatory", () => {
    return request(httpServer).post("/users").send(missingEmail).expect(400);
  });
  it("/users - password is mandatory", () => {
    return request(httpServer).post("/users").send(missingPassword).expect(400);
  });
  it("/users - valid request successfully creates user", () => {
    return request(httpServer)
      .post("/users")
      .send(completeUser)
      .expect(201)
      .then(({ body }: { body: { data: { [key: string]: any } } }) => {
        expect(body.data).toBeDefined();
        expect(body.data?.firstName).toBe(completeUser.firstName);
        expect(body.data?.lastName).toBe(completeUser.lastName);
        console.log(body);
      });
  });
  it("/users - password is not returned in response", () => {
    return request(httpServer)
      .post("/users")
      .send(completeUser)
      .expect(201)
      .then(({ body }: { body: { data: { [key: string]: any } } }) => {
        expect(body.data?.password).toBeUndefined();
      });
  });
  it("/users - googleId is not returned in response", () => {
    return request(httpServer)
      .post("/users")
      .send(completeUser)
      .expect(201)
      .then(({ body }: { body: { data: { [key: string]: any } } }) => {
        expect(body.data?.googleId).toBeUndefined();
      });
  });
});

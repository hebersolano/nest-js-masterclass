import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { CreateManyUsersProvider } from "./create-many.provider";
import { CreateUserProvider } from "./create.provider";
import { DataSource } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../user.entity";

const mockCreateUserProvider: Partial<CreateUserProvider> = {
  createUser(createUserDto) {
    return Promise.resolve({
      id: 12,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password,
    });
  },
};

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: CreateUserProvider, useValue: mockCreateUserProvider },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: CreateManyUsersProvider, useValue: {} },
      ],
      imports: [],
    })
      // .overrideProvider(CreateUserProvider)
      // .useValue(mockCreateUserProvider)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createUser", () => {
    it("should be defined", () => {
      expect(service.create).toBeDefined();
    });
    it("should call createUser on CreateUserProvider", async () => {
      const user = await service.create({
        firstName: "John",
        lastName: "Doe",
        email: "mail@host.com",
        password: "password",
      });

      expect(user.firstName).toEqual("John");
      expect(user.lastName).toEqual("Doe");
      expect(user.email).toEqual("mail@host.com");
      expect(user.password).toEqual("password");
    });
  });
});

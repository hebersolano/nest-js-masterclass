import { Test } from "@nestjs/testing";
import { CreateUserProvider } from "./create.provider";
import { MailService } from "src/mail/mail-providers/mail.service";
import { HashingProvider } from "src/auth/auth-providers/hashing.provider";
import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../user-entities/user.entity";
import { BadRequestException } from "@nestjs/common";

const user = {
  id: 12,
  firstName: "John",
  lastName: "John",
  email: "johndoe@mail.com",
  password: "password",
};

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <
  T extends ObjectLiteral = any,
>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  existsBy: jest.fn(),
});

const mailServiceMock: Partial<MailService> = {
  sendUserWelcome: jest.fn(() => Promise.resolve()),
};

const hashingProviderMock: Partial<HashingProvider> = {
  hashPassword: jest.fn(() => Promise.resolve(user.password)),
};

describe("CreateUserProvider", () => {
  let provider: CreateUserProvider;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        CreateUserProvider,
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
        { provide: DataSource, useValue: {} },
        { provide: MailService, useValue: mailServiceMock },
        { provide: HashingProvider, useValue: hashingProviderMock },
      ],
    }).compile();

    provider = moduleRef.get(CreateUserProvider);
    userRepository = moduleRef.get(getRepositoryToken(User));
  });

  it("Should be defined", () => {
    expect(provider).toBeDefined();
  });

  describe("createUser", () => {
    describe("When user does not exist in DB", () => {
      it("should create a new user", async () => {
        userRepository.existsBy?.mockReturnValue(false);
        userRepository.create?.mockReturnValue(user);
        userRepository.save?.mockReturnValue(user);

        const newUser = await provider.createUser(user);

        expect(userRepository.existsBy).toHaveBeenCalledWith({
          email: user.email,
        });
        expect(userRepository.create).toHaveBeenCalledWith(user);
        expect(userRepository.save).toHaveBeenCalledWith(user);
        expect(newUser.email).toEqual(user.email);
      });
    });
    describe("When user exists in DB", () => {
      it("should throw BadRequestException", async () => {
        userRepository.existsBy?.mockReturnValue(true);
        userRepository.create?.mockReturnValue(user);
        userRepository.save?.mockReturnValue(user);

        try {
          await provider.createUser(user);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});

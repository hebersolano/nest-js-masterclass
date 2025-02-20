import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { compare, genSalt, hash } from "bcryptjs";
import { HashingProvider } from "./hashing.provider";

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(data: string): Promise<string> {
    try {
      const salt = await genSalt();
      return await hash(data, salt);
    } catch {
      throw new InternalServerErrorException(
        "Service is not available right now, please try later",
      );
    }
  }

  async comparePassword(data: string, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted);
  }
}

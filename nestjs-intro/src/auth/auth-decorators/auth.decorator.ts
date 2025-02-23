import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../auth-enums/auth-type.enum";

export const Auth = (authType: AuthType) => SetMetadata("authType", authType);

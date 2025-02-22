import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @Length(3, 96)
  @IsNotEmpty()
  firstName: string;

  @Length(1, 96)
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @Length(1, 96)
  @IsNotEmpty()
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      "Minimum eight characters, at least one letter, one number and one special character",
  })
  @Length(8, 96)
  @IsNotEmpty()
  password: string;
}

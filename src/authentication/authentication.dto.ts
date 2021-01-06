import { IsString, IsEmail, IsNumber, IsBoolean } from "class-validator";

export class LogInDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public gender: string;

  @IsString()
  public role: string;

  @IsString()
  public researchCenter: string;
}

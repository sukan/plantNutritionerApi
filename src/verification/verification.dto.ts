import { IsArray, IsBoolean, IsString } from "class-validator";

export class VerificationDto {
  @IsString()
  public verificationId: string;

  @IsString()
  public username: string;

  @IsString()
  public deficiency: string;

  @IsString()
  public findings: string;

  @IsArray()
  products: Array<any>;

  @IsString()
  public researchCenter: string;

  @IsString()
  public image: string;

  @IsString()
  public stage: string;

  @IsString()
  public nValue: string;

  @IsString()
  public pValue: string;

  @IsString()
  public kValue: string;

  @IsBoolean()
  public checked: boolean;
}
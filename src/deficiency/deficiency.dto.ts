import { IsString } from "class-validator";

export class DeficiencyDto {
  @IsString()
  public deficiency: string;

  @IsString()
  public researchCenter: string;
}
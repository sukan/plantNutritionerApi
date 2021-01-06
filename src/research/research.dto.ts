import { IsArray, IsString } from "class-validator";

export class ResearchDto {
  @IsString()
  public researchId: string;

  @IsString()
  public deficiency: string;

  @IsString()
  public findings: string;

  @IsArray()
  public products: Array<any>;

  @IsString()
  public researchCenter: string;
}
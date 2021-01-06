import { IsNumber, IsString } from "class-validator";

export class ProductDto {
  @IsString()
  public productCode: string;

  @IsString()
  public productName: string;

  @IsString()
  public vendor: string;

  @IsNumber()
  public unitPrice: number;

  @IsString()
  public applicationMethod: string;

  @IsString()
  public deficiency: string;

  @IsString()
  public researchCenter: string;
}
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  skip: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;
}

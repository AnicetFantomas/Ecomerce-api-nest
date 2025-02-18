/* eslint-disable */
import { IsInt, IsPositive } from 'class-validator';

export class IdParamDto {
  @IsInt()
  @IsPositive()
  id: number;
}

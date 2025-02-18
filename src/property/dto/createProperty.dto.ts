/* eslint-disable */
import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
//   @Length(2,12)
  name: string;

  @IsString()
//   @Length(2,100,{groups:['create']})
//   @Length(1,150,{groups:['update']})
  description: string;

  @IsInt()
  @IsPositive()
  price: number;
}

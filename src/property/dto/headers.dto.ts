/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class HeadersDto {
  @IsString()
  @Expose({ name: 'access-token' })
  accessToken: string;
}

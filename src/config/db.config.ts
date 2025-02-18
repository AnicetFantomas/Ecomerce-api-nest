import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    port: +process.env.DATABASE_PORT!,
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
);

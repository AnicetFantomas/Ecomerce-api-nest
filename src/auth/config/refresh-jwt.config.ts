import { JwtSignOptions } from './../../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';
import { registerAs } from '@nestjs/config';
console.log('JWT_SECRET:', process.env.JWT_SECRET);
export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  }),
);

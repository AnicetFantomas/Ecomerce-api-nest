import { JwtModuleOptions } from './../../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';
import { registerAs } from '@nestjs/config';
console.log('JWT_SECRET:', process.env.JWT_SECRET);
export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
  }),
);

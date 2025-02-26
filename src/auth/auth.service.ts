import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');
    return { id: user.id };
  }

  async login(userId: number) {
    // const payload: AuthJwtPayload = { sub: userId };
    // const token = this.jwtService.sign(payload);
    // const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    const { token, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return { id: userId, token, refreshToken };
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return { token, refreshToken };
  }

  refreshToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload);
    return { id: userId, token };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid refresh token');
    const isRefreshTokenMatch = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!isRefreshTokenMatch)
      throw new UnauthorizedException('Invalid refresh token');
    return { id: userId };
  }
}

/*eslint-disable*/
import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: any) {
    return this.authService.login(req.user.id);
    // return { id: req.user.id, token };
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req: any) {
    return this.authService.refreshToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signout(@Request() req: any) {
    return this.authService.signOut(req.user.id);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const response  = await this.authService.login(req.user.id)
    res.redirect(`http://localhost:5173?token=${response.token}`);
  }
}
  
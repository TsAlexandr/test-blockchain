import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { JwtResponseInterface } from '../interfaces/jwt-response.interface';
import { AuthCommand } from '../dto/auth.command';
import { Cookies } from '../../shared/custom-decorators/cookie.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() body: AuthCommand): Promise<boolean> {
    return this.authService.signUp(body);
  }

  @Post('signIn')
  async signIn(@Body() body: AuthCommand): Promise<JwtResponseInterface> {
    return this.authService.signIn(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Cookies() cookie: string): Promise<JwtResponseInterface> {
    return this.authService.refresh(cookie);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthInterface } from '../interfaces/jwt-auth.interface';

@Injectable()
export class AuthConfig {
  public readonly jwt: JwtAuthInterface;
  constructor(private readonly configService: ConfigService) {
    this.jwt = {
      access: {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<number>('JWT_ACCESS_LIFETIME', 86400),
      },
      refresh: {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<number>(
          'JWT_REFRESH_LIFETIME',
          2592000,
        ),
      },
    };
  }
}

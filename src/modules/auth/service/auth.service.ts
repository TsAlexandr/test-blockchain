import { HttpException, Injectable } from '@nestjs/common';
import { AuthCommand } from '../dto/auth.command';
import { JwtResponseInterface } from '../interfaces/jwt-response.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../../users/repository/users.repository';
import { ServiceError } from '../../shared/exceptions/errors.enum';
import { HttpStatusEnum } from '../../shared/exceptions/http-status.enum';
import { JwtPayloadRefreshInterface } from '../interfaces/jwt-payload.interface';
import { AuthConfig } from '../config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authConfig: AuthConfig,
    private configService: ConfigService,
    private usersRepository: UsersRepository,
  ) {}

  async signUp(body: AuthCommand): Promise<boolean> {
    const user = await this.usersRepository.getUserByAddress(body.address);
    if (user) {
      throw new HttpException(
        ServiceError.USER_EXIST,
        HttpStatusEnum.BAD_REQUEST,
      );
    }
    return this.usersRepository.createUser(body);
  }

  async signIn(body: AuthCommand): Promise<JwtResponseInterface> {
    const user = await this.usersRepository.getUserByAddress(body.address);
    if (!user) {
      throw new HttpException(
        ServiceError.USER_NOT_FOUND,
        HttpStatusEnum.NOT_FOUND,
      );
    }
    return this._generateTokens(body.address);
  }

  async refresh(cookie: string): Promise<JwtResponseInterface> {
    const payload: JwtPayloadRefreshInterface =
      await this.jwtService.verifyAsync(cookie, {
        secret: this.authConfig.jwt.refresh.secret,
      });
    if (!payload) {
      throw new HttpException(
        ServiceError.INVALID_REFRESH_TOKEN,
        HttpStatusEnum.BAD_REQUEST,
      );
    }
    return this._generateTokens(payload.address);
  }

  private _generateTokens(payload: string): JwtResponseInterface {
    const accessToken = this.jwtService.sign(
      payload,
      this.authConfig.jwt.access,
    );
    const refreshToken = this.jwtService.sign(
      payload,
      this.authConfig.jwt.refresh,
    );

    return { accessToken, refreshToken };
  }
}

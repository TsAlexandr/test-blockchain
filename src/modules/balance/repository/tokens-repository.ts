import { InjectRepository } from '@nestjs/typeorm';
import { TokensEntity } from '../entities/tokens.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokensRepository {
  constructor(
    @InjectRepository(TokensEntity)
    private readonly tokensRepository: Repository<TokensEntity>,
  ) {}
}

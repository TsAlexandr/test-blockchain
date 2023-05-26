import { Module } from '@nestjs/common';
import { BalanceController } from './controller/balance.controller';
import { GetMyBalanceHandler } from './usecases/query-handlers/get-my-balance.handler';
import { TokensRepository } from './repository/tokens-repository';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensEntity } from './entities/tokens.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TokensEntity])],
  controllers: [BalanceController],
  providers: [GetMyBalanceHandler, TokensRepository],
})
export class BalanceModule {}

import { Module } from '@nestjs/common';
import { BalanceService } from './service/balance.service';
import { BalanceController } from './controller/balance.controller';
import { GetMyBalanceHandler } from './usecases/query-handlers/get-my-balance.handler';
import { TokensRepository } from './repository/tokens-repository';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [BalanceController],
  providers: [BalanceService, GetMyBalanceHandler, TokensRepository],
})
export class BalanceModule {}

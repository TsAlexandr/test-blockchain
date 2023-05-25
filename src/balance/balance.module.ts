import { Module } from '@nestjs/common';
import { BalanceService } from './service/balance.service';
import { BalanceController } from './controller/balance.controller';
import { BINANCE_TESTNET_NETWORK, EthersModule } from 'nestjs-ethers';

@Module({
  imports: [
    EthersModule.forRoot({
      network: BINANCE_TESTNET_NETWORK,
      useDefaultProvider: true,
    }),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}

import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';
import { InjectEthersProvider } from 'nestjs-ethers';
import BigNumber from 'bignumber.js';

@Injectable()
export class BalanceService {
  private web3Instance: Web3;
  constructor(
    private configService: ConfigService,
    @InjectEthersProvider() private bscProvider,
  ) {
    this.web3Instance = new Web3(
      new Web3.providers.HttpProvider(
        this.configService.get<string>('WEB3_PROVIDER'),
      ),
    );
  }

  async getBalanceByAddress(address: string) {
    const balanceInWei = await this.web3Instance.eth.getBalance(address);
    const b = await this.bscProvider.getBalance(address);
    console.log(b);
    return this.web3Instance.utils.fromWei(balanceInWei, 'ether');
  }
}

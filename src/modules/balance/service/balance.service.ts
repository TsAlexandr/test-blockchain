import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';
import { ethers, EtherscanProvider } from 'ethers';

@Injectable()
export class BalanceService {
  private web3Instance: Web3;
  constructor(private configService: ConfigService) {
    this.web3Instance = new Web3(
      new Web3.providers.HttpProvider(
        this.configService.get<string>('WEB3_PROVIDER'),
      ),
    );
  }

  async getBalanceByAddress(address: string) {
    const balanceInWei = await this.web3Instance.eth.getBalance(address);
    const provider = new EtherscanProvider(
      'homestead',
      this.configService.get<string>('API_KEY'),
    );
    const test = await provider.getBalance(address);
    const balanceInEtherscan = ethers.formatEther(test.toString());
    const balanceInBscscan = this.web3Instance.utils.fromWei(
      balanceInWei,
      'ether',
    );

    return {
      eth: balanceInEtherscan,
      bnb: balanceInBscscan,
    };
  }
}

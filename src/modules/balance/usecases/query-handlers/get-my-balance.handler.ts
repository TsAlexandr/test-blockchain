import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMyBalanceCommand } from '../query-commands/get-my-balance.command';
import { TokensRepository } from '../../repository/tokens-repository';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';
import { ethers, EtherscanProvider } from 'ethers';
import { mappedBalance } from '../../../../common/helpers/mapped-balance';
import { CoinSymbol } from '../../enums/symbols';

@QueryHandler(GetMyBalanceCommand)
export class GetMyBalanceHandler implements IQueryHandler<GetMyBalanceCommand> {
  private web3Instance: Web3;
  constructor(
    private tokensRepository: TokensRepository,
    private configService: ConfigService,
  ) {
    this.web3Instance = new Web3(
      new Web3.providers.HttpProvider(
        this.configService.get<string>('WEB3_PROVIDER'),
      ),
    );
  }
  async execute(query: GetMyBalanceCommand): Promise<any> {
    if (query.input.network === 'WEB3') {
      const balanceInWei = await this.web3Instance.eth.getBalance(
        query.input.address,
      );
      const balanceInBnb = this.web3Instance.utils.fromWei(
        balanceInWei,
        'ether',
      );

      const getTokens = await this.tokensRepository.getTokensFromChain('bsc');
      return mappedBalance(
        getTokens,
        balanceInBnb,
        getTokens.find(
          (value) => value.symbol.toUpperCase() === CoinSymbol.BNB,
        ),
      );
    } else {
      const provider = new EtherscanProvider(
        'homestead',
        this.configService.get<string>('API_KEY'),
      );
      const test = await provider.getBalance(query.input.address);
      const balanceInEther = ethers.formatEther(test.toString());

      const getTokens = await this.tokensRepository.getTokensFromChain('eth');

      return mappedBalance(
        getTokens,
        balanceInEther,
        getTokens.find(
          (value) => value.symbol.toUpperCase() === CoinSymbol.ETH,
        ),
      );
    }
  }
}

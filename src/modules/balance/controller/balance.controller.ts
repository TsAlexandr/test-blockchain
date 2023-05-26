import { Controller, Get, Query } from '@nestjs/common';
import { InputDto } from '../dto/query/input.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetMyBalanceCommand } from '../usecases/query-commands/get-my-balance.command';

@Controller('')
export class BalanceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('balance')
  async getBalance(@Query() input: InputDto) {
    return this.queryBus.execute(new GetMyBalanceCommand(input));
  }
}

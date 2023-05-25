import { Controller, Get, Param, Query } from '@nestjs/common';
import { BalanceService } from '../service/balance.service';
import { InputDto } from '../dto/query/input.dto';

@Controller('')
export class BalanceController {
  constructor(private readonly moduleService: BalanceService) {}

  @Get('balance')
  async getBalance(@Query() input: InputDto) {
    return this.moduleService.getBalanceByAddress(input.address);
  }
}

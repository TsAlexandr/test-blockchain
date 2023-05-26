import { InputDto } from '../../dto/query/input.dto';

export class GetMyBalanceCommand {
  constructor(public readonly input: InputDto) {}
}

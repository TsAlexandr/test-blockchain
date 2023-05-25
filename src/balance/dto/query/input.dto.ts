import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Networks } from '../../enums/enums';

export class InputDto {
  @IsEnum(Networks)
  @IsNotEmpty()
  network: Networks;

  @IsString()
  @IsNotEmpty()
  address: string;
}

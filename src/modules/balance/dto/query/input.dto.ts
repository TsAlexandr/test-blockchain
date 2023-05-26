import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Networks } from '../../enums/networks';
import { Transform } from 'class-transformer';

export class InputDto {
  @IsEnum(Networks)
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty()
  network: Networks;

  @IsString()
  @IsNotEmpty()
  address: string;
}

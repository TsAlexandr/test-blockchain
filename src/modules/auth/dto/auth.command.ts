import {
  IsEthereumAddress,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class AuthCommand {
  @IsEthereumAddress()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

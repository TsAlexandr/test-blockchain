import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CoinSymbol } from '../enums/symbols';

@Entity({ name: 'tokens' })
export class TokensEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  address: string;
  @Column({ type: 'int' })
  decimals: number;
  @Column({ unique: true })
  symbol: CoinSymbol;
  @Column({ type: 'varchar' })
  chain: string;
  @Column({ type: 'int' })
  chainId: number;
  @Column({ type: 'varchar' })
  usd: string;
}

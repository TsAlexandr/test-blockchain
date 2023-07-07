import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  address: string;

  @Column({ nullable: true, select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private encryptPassword(): void {
    if (!this.password) {
      return;
    }
    this.password = hashSync(this.password, 10);
  }

  passwordMatches(password: string): boolean {
    if (!password) {
      return false;
    }
    return compareSync(password, this.password);
  }
}

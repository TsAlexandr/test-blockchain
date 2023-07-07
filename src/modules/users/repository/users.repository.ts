import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthCommand } from '../../auth/dto/auth.command';

@Injectable()
export class UsersRepository {
  constructor(private usersRepository: Repository<UserEntity>) {}

  async getUserByAddress(address: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ address });
  }

  async createUser(body: AuthCommand): Promise<boolean> {
    await this.usersRepository.save(body);
    return true;
  }
}

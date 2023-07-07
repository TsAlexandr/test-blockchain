import { Module } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';

@Module({
  controllers: [],
  providers: [UsersRepository],
})
export class UsersModule {}

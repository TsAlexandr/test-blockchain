import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const databaseConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  entities: ['dist/modules/**/entities/*.entity.js'],
  synchronize: true,
});

import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    entities: ['src/databases/entities/*.entity.ts'],
    seeds: ['databases/seeds/*.ts'],
    factories: ['databases/factories/*.ts'],
    seedTracking: false,
    namingStrategy: new SnakeNamingStrategy(),
};

export const dataSource = new DataSource(options);
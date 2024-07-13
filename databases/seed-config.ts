import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432') ,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    entities: ['src/databases/entities/*.entity.ts'],
    seeds: ['databases/seeds/*.ts'],
    factories: ['databases/factories/*.ts']
}

import dotenv from 'dotenv';
import type { Knex } from 'knex';

require('ts-node/register');

dotenv.config();

const environments: string[] = ['development', 'staging', 'production'];

const commonConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'docker',
    database: process.env.DB_NAME || 'postgres',
    port: 5432
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory:  __dirname + '/migrations'
  },
  seeds: {
    directory:  __dirname + '/seeds'
  }
};

export default Object.fromEntries(environments.map((env: string) => [env, commonConfig]));

import Knex from 'knex';
import configs from './knexfile';

const database = Knex(configs[process.env.NODE_ENV || 'development']);

export default database;
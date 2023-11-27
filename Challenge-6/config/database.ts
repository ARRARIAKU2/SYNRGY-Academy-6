import knex from 'knex';

const database = knex({
  client: 'pg',
  connection: 'postgres://postgres:docker@127.0.0.1:5432/postgres', // url postgres
  searchPath: ['public'], // schema
});

export default database;

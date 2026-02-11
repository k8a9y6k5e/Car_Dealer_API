import 'dotenv/config'
import Knex from 'knex';

export const knex = Knex({
  client : 'mysql2',
  connection: process.env.DATABASE_URL!
});
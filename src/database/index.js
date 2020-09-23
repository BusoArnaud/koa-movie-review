import * as QUERIES from './queries';
import { createKnex } from './connection';
import { setupDatabase } from './setup';

export async function createDatabase(filePath) {
  const knex = createKnex(filePath);
  await setupDatabase(knex, filePath);

  // bind knex on queries
  const queries = Object.keys(QUERIES).reduce((acc, key) => {
    acc[key] = (...args) => QUERIES[key](knex, ...args);
    return acc;
  }, {});

  return {
    ...queries,
    knex,
    close: async () => {
      await knex.destroy();
    },
  };
}

export async function findUserByUsername(username) {
  return knex.table('users').where('username', username).first();
}

export async function findUserByToken(token) {
  return knex.table('users').where('token', token).first();
}

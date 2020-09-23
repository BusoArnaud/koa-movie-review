import Knex from 'knex';
// import { envs } from '../logic/envs';
// import path from 'path';

export function createKnex(filePath) {
  return Knex({
    client: 'sqlite3',
    connection: {
      filename: filePath,
    },
    useNullAsDefault: true,
  });
}

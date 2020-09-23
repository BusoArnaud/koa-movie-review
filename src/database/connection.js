import Knex from 'knex';

export function createKnex(filePath) {
  return Knex({
    client: 'sqlite3',
    connection: {
      filename: filePath,
    },
    useNullAsDefault: true,
  });
}

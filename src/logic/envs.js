import * as z from 'zod';

const schema = z.object({
  SQLITE_FILE_PATH: z.string(),
  NODE_ENV: z.enum('production', 'developement', 'test'),
});

export const envs = schema.parse({
  SQLITE_FILE_PATH: process.env.SQLITE_FILE_PATH,
  NODE_ENV: process.env.NODE_ENV,
});

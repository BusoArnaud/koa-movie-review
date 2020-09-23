import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const envFiles = [
  ...(process.env.NODE_ENV === 'test' ? ['.env.test.local', '.env.test'] : []),
  '.env.local',
  '.env',
];

envFiles.forEach((path) => {
  dotenvExpand(dotenv.config({ path }));
});

export const main = require('./app').main;

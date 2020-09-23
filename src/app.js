import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import errorHandler from 'koa-error';
import { createDatabase } from './database';
import { router } from './routes';
import helmet from 'koa-helmet';
import { createServer } from 'http';
import path from 'path';
import { envs } from './logic/envs';

export async function main() {
  const SQLITE_FILE_PATH = path.resolve(process.cwd(), envs.SQLITE_FILE_PATH);

  // setup database before starting the app !
  const db = await createDatabase(SQLITE_FILE_PATH);

  const app = new Koa();

  // attach db on context
  app.use(async (ctx, next) => {
    ctx.db = db;
    return next();
  });

  app.use(cors());
  app.use(errorHandler({ accepts: ['json'] }));
  app.use(helmet());
  app.use(bodyparser({ enableTypes: ['json'] }));

  app.use(router.routes());
  app.use(router.allowedMethods());

  const server = createServer(app.callback());

  return { server, db };
}

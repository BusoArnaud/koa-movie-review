import { setup } from '../src/setup';
import supertest from 'supertest';
import fse from 'fs-extra';
import path from 'path';

const main = setup();

describe('API', () => {
  let server, db;

  beforeEach(async () => {
    const app = await main();
    server = app.server;
    db = app.db;
  });

  afterEach(async () => {
    await db.close();
    await fse.remove(path.resolve(process.cwd(), process.env.SQLITE_FILE_PATH));
  });

  it('should respond on home', async () => {
    await supertest(server).get('/').expect(200, { you: '<- are here !' });
  });

  it('should get empty movies', async () => {
    await supertest(server).get('/movies').expect(200, []);
  });

  it('should signup', async () => {
    const res = await supertest(server)
      .post('/users/signup')
      .send({
        username: 'etienne',
        password: 'yolo',
        name: 'Etienne',
      })
      .expect(200);
    expect(res.body).toMatchObject({
      username: 'etienne',
      name: 'Etienne',
    });
    expect(Object.keys(res.body).sort()).toEqual([
      'name',
      'password',
      'token',
      'user_id',
      'username',
    ]);
  });

  it('should return the token when login', async () => {
    await db.knex.table('users').insert([
      {
        user_id: '2d43c86c-76a9-4566-a107-09d25d56fad3',
        username: 'etienne',
        token: 'NDMU1Dx97LxOpCOe7wE86',
        password: '$2b$10$R6/eL5r6SrXSl7Xj5Gnq7.cchmefYWWyaB6182/KAkrqIARm8qWGW',
        name: 'Etienne',
      },
    ]);
    const res = await supertest(server)
      .post('/users/login')
      .send({ username: 'etienne', password: 'yolo' })
      .expect(200);

    expect(res.body.token).toBe('NDMU1Dx97LxOpCOe7wE86');
  });

  it('should return 403 if wrong password', async () => {
    await db.knex.table('users').insert([
      {
        user_id: '2d43c86c-76a9-4566-a107-09d25d56fad3',
        username: 'etienne',
        token: 'NDMU1Dx97LxOpCOe7wE86',
        password: '$2b$10$R6/eL5r6SrXSl7Xj5Gnq7.cchmefYWWyaB6182/KAkrqIARm8qWGW',
        name: 'Etienne',
      },
    ]);
    await supertest(server)
      .post('/users/login')
      .send({ username: 'etienne', password: 'oops' })
      .expect(403);
  });
});

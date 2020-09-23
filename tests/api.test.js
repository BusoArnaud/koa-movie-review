import { setup } from '../src/setup';
import supertest from 'supertest';

const main = setup();

describe('API', () => {
  it('should respond on home', async () => {
    const { server, db } = await main();
    await supertest(server).get('/').expect(200, { you: '<- are here !' });
    await db.close();
  });
});

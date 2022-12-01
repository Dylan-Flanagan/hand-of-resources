const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('films routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /films should return a list of films', async () => {
    const resp = await request(app).get('/films');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(8);
    expect(resp.body).toMatchInlineSnapshot();
  });
});
afterAll(() => {
  pool.end();
});

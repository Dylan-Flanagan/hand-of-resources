const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('guitars routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /guitars should return a list of guitars', async () => {
    const resp = await request(app).get('/guitars');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(4);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "maker": "Fender",
          "name": "Jazzmaster",
        },
        Object {
          "id": "2",
          "maker": "Gibson",
          "name": "Firebird",
        },
        Object {
          "id": "3",
          "maker": "Harmony",
          "name": "Silhouette",
        },
        Object {
          "id": "4",
          "maker": "Yamaha",
          "name": "SG-2A",
        },
      ]
    `);
  });

  afterAll(() => {
    pool.end();
  });
});

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('pedals routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /pedals should return a list of pedals', async () => {
    const resp = await request(app).get('/pedals');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(4);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "maker": "Keeley",
          "name": "Loomer",
        },
        Object {
          "id": "2",
          "maker": "Way Huge",
          "name": "Russian Pickle",
        },
        Object {
          "id": "3",
          "maker": "Zoom",
          "name": "MS-50G",
        },
        Object {
          "id": "4",
          "maker": "Boss",
          "name": "Blues Driver",
        },
      ]
    `);
  });

  it('GET /pedals:id should return a pedals detail', async () => {
    const resp = await request(app).get('/pedals/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "maker": "Keeley",
        "name": "Loomer",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});

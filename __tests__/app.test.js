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
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "director": "Paul Thomas Anderson",
          "genre": "Period Drama",
          "id": "1",
          "year": 2007,
        },
        Object {
          "director": "Stanley Kubrick",
          "genre": "Dystopian Crime",
          "id": "2",
          "year": 1971,
        },
        Object {
          "director": "Ethan Coen",
          "genre": "Comedy",
          "id": "3",
          "year": 1987,
        },
        Object {
          "director": "Paul Thomas Anderson",
          "genre": "Comedy",
          "id": "4",
          "year": 2002,
        },
        Object {
          "director": "Danny Boyle",
          "genre": "Comedy-Drama",
          "id": "5",
          "year": 1996,
        },
        Object {
          "director": "Who Cares",
          "genre": "Bad",
          "id": "6",
          "year": 2022,
        },
        Object {
          "director": "Wes Anderson",
          "genre": "Comedy",
          "id": "7",
          "year": 2014,
        },
        Object {
          "director": "Park Chan-wook",
          "genre": "Neo-Noir Action Thriller",
          "id": "8",
          "year": 2003,
        },
      ]
    `);
  });
});
afterAll(() => {
  pool.end();
});

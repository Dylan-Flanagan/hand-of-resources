const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('videos routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /videos should return a list of videos', async () => {
    const resp = await request(app).get('/videos');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(4);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "team": "Alien Workshop",
          "title": "Mind Field",
          "year": 2009,
        },
        Object {
          "id": "2",
          "team": "Alien Workshop",
          "title": "Photosynthesis",
          "year": 2000,
        },
        Object {
          "id": "3",
          "team": "Transworld",
          "title": "A Time to Shine",
          "year": 2006,
        },
        Object {
          "id": "4",
          "team": "Supreme",
          "title": "Cherry",
          "year": 2014,
        },
      ]
    `);
  });

  it('GET /videos :id should return a video detail', async () => {
    const resp = await request(app).get('/videos/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "team": "Alien Workshop",
        "title": "Mind Field",
        "year": 2009,
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});

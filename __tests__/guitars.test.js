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

  it('GET /guitars:id should return a guitars detail', async () => {
    const resp = await request(app).get('/guitars/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "maker": "Fender",
        "name": "Jazzmaster",
      }
    `);
  });

  it('POST /guitars should create a new guitar', async () => {
    const newGuitar = {
      name: 'SG-2C',
      maker: 'Yamaha',
    };
    const resp = await request(app).post('/guitars').send(newGuitar);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newGuitar,
    });
  });

  it('PUT /guitars/:id should update an existing guitar', async () => {
    const resp = await request(app).put('/guitars/4').send({
      name: 'SG-7A',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('SG-7A');
  });

  it('DELETE /guitars/:id should delete a guitar', async () => {
    const resp = await request(app).delete('/guitars/1');
    expect(resp.status).toBe(200);

    const guitarResp = await request(app).get('/guitars/1');
    expect(guitarResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});

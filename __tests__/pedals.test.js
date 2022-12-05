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

  it('POST /pedals should create a new pedal', async () => {
    const newPedal = {
      name: 'TB-2W',
      maker: 'Boss',
    };
    const resp = await request(app).post('/pedals').send(newPedal);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newPedal,
    });
  });

  it('PUT /pedals/:id should update an existing pedal', async () => {
    const resp = await request(app).put('/pedals/4').send({
      maker: 'Waza Craft',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.maker).toBe('Waza Craft');
  });

  it('DELETE /pedals/:id should delete a pedal', async () => {
    const resp = await request(app).delete('/pedals/1');
    expect(resp.status).toBe(200);

    const pedalResp = await request(app).get('/pedals/1');
    expect(pedalResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});

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

  it('POST /videos should create a new video', async () => {
    const newVideo = {
      title: 'I Like It Here Inside My Mind, Dont Wake Me This Time',
      team: 'Polar Skate Co.',
      year: 2016,
    };
    const resp = await request(app).post('/videos').send(newVideo);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newVideo,
    });
  });

  it('PUT /videos/:id should update an existing video', async () => {
    const resp = await request(app).put('/videos/4').send({
      title: 'Cherry - A Skate Video',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.title).toBe('Cherry - A Skate Video');
  });

  it('DELETE /videos/:id should delete a video', async () => {
    const resp = await request(app).delete('/videos/1');
    expect(resp.status).toBe(200);

    const videoResp = await request(app).get('/videos/1');
    expect(videoResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});

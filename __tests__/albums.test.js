const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('albums routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /albums should return a list of albums', async () => {
    const resp = await request(app).get('/albums');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(8);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "artist": "Thinking Fellers Union Local 282",
          "genre": "Art Rock",
          "id": "1",
          "title": "Strangers from the Universe",
          "year": 1994,
        },
        Object {
          "artist": "Helvetia",
          "genre": "Rock",
          "id": "2",
          "title": "The Acrobats",
          "year": 2007,
        },
        Object {
          "artist": "Black Moth Super Rainbow",
          "genre": "Psychedelic/Electronic",
          "id": "3",
          "title": "Start a People",
          "year": 2004,
        },
        Object {
          "artist": "Animal Collective",
          "genre": "Experimental Pop",
          "id": "4",
          "title": "Merriweather Post Pavilion",
          "year": 2009,
        },
        Object {
          "artist": "Slint",
          "genre": "Rock",
          "id": "5",
          "title": "Spiderland",
          "year": 1991,
        },
        Object {
          "artist": "My Bloody Valentine",
          "genre": "Shoegaze",
          "id": "6",
          "title": "Isnt Anything",
          "year": 1988,
        },
        Object {
          "artist": "Modest Mouse",
          "genre": "Rock",
          "id": "7",
          "title": "Building Nothing Out of Something",
          "year": 2000,
        },
        Object {
          "artist": "Aphex Twin",
          "genre": "Electronic",
          "id": "8",
          "title": "Richard D. James Album",
          "year": 1996,
        },
      ]
    `);
  });
  it('GET /albums:id should return an albums detail', async () => {
    const resp = await request(app).get('/albums/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "artist": "Thinking Fellers Union Local 282",
        "genre": "Art Rock",
        "id": "1",
        "title": "Strangers from the Universe",
        "year": 1994,
      }
    `);
  });
  it('POST /albums should create a new album', async () => {
    const newAlbum = {
      title: 'Todays Active Lifestyles',
      artist: 'Polvo',
      genre: 'Experimental Rock',
      year: 1993,
    };
    const resp = await await request(app).post('/albums').send(newAlbum);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newAlbum,
    });
  });
});

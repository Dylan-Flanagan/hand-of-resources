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
          "title": "There Will Be Blood",
          "year": 2007,
        },
        Object {
          "director": "Stanley Kubrick",
          "genre": "Dystopian Crime",
          "id": "2",
          "title": "A Clockwork Orange",
          "year": 1971,
        },
        Object {
          "director": "Ethan Coen",
          "genre": "Comedy",
          "id": "3",
          "title": "Raising Arizona",
          "year": 1987,
        },
        Object {
          "director": "Paul Thomas Anderson",
          "genre": "Comedy",
          "id": "4",
          "title": "Punch-Drunk Love",
          "year": 2002,
        },
        Object {
          "director": "Danny Boyle",
          "genre": "Comedy-Drama",
          "id": "5",
          "title": "Trainspotting",
          "year": 1996,
        },
        Object {
          "director": "Who Cares",
          "genre": "Bad",
          "id": "6",
          "title": "Moonfall",
          "year": 2022,
        },
        Object {
          "director": "Wes Anderson",
          "genre": "Comedy",
          "id": "7",
          "title": "The Grand Budapest Hotel",
          "year": 2014,
        },
        Object {
          "director": "Park Chan-wook",
          "genre": "Neo-Noir Action Thriller",
          "id": "8",
          "title": "Oldboy",
          "year": 2003,
        },
      ]
    `);
  });

  it('GET /films:id should return a films detail', async () => {
    const resp = await request(app).get('/films/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "director": "Paul Thomas Anderson",
        "genre": "Period Drama",
        "id": "1",
        "title": "There Will Be Blood",
        "year": 2007,
      }
    `);
  });

  it('POST /films should create a new film', async () => {
    const newFilm = {
      title: 'Inglorious Basterds',
      director: 'Quentin Tarantino',
      genre: 'Action Comedy',
      year: 2009,
    };
    const resp = await await request(app).post('/films').send(newFilm);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newFilm,
    });
  });

  it('PUT /films/:id should update an existing film', async () => {
    const resp = await request(app).put('/films/6').send({
      genre: 'Garbage',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.genre).toBe('Garbage');
  });

  afterAll(() => {
    pool.end();
  });
});

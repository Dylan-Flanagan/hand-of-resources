const pool = require('../utils/pool');

class Film {
  id;
  title;
  director;
  genre;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.director = row.director;
    this.genre = row.genre;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from films');

    return rows.map((filmRow) => new Film(filmRow));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from films where id = $1', [
      id,
    ]);
    return new Film(rows[0]);
  }

  static async insert({ title, director, genre, year }) {
    const { rows } = await pool.query(
      `
       INSERT INTO films (title, director, genre, year)
       VALUES ($1, $2, $3, $4)
       RETURNING *
       `,
      [title, director, genre, year]
    );
    return new Film(rows[0]);
  }
}

module.exports = { Film };

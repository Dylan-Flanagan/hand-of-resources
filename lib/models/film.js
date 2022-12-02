const pool = require('../utils/pool');

class Film {
  id;
  title;
  director;
  genre;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.name;
    this.director = row.director;
    this.genre = row.genre;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from films');

    return rows.map((filmRow) => new Film(filmRow));
  }
}

module.exports = { Film };

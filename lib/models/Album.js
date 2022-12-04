const pool = require('../utils/pool.js');

class Album {
  id;
  title;
  artist;
  genre;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.genre = row.genre;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from albums');

    return rows.map((albumRow) => new Album(albumRow));
  }
}

module.exports = { Album };

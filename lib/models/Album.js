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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from albums where id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Album(rows[0]);
  }

  static async insert({ title, artist, genre, year }) {
    const { rows } = await pool.query(
      `
      INSERT INTO albums (title, artist, genre, year)
      VALUES ($1, $2, $3, $4)
      RETURNING * 
      `,
      [title, artist, genre, year]
    );
    return new Album(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const album = await Album.getById(id);
    if (!album) return null;
    const updatedAlbum = { ...album, ...newAttrs };
    const { rows } = await pool.query(
      `UPDATE albums
      SET title = $2, artist = $3, genre = $4, year = $5
      WHERE id = $1
      RETURNING *;
      `,
      [
        id,
        updatedAlbum.title,
        updatedAlbum.artist,
        updatedAlbum.genre,
        updatedAlbum.year,
      ]
    );
    return new Album(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE from albums
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return new Album(rows[0]);
  }
}

module.exports = { Album };

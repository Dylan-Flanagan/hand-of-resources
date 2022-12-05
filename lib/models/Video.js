const pool = require('../utils/pool');

class Video {
  id;
  title;
  team;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.team = row.team;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from videos');

    return rows.map((videoRow) => new Video(videoRow));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from videos where id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Video(rows[0]);
  }
  static async insert({ title, team, year }) {
    const { rows } = await pool.query(
      `
       INSERT INTO videos (title, team, year)
       VALUES ($1, $2, $3)
       RETURNING *
       `,
      [title, team, year]
    );
    return new Video(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const video = await Video.getById(id);
    if (!video) return null;
    const updatedVideo = { ...video, ...newAttrs };
    const { rows } = await pool.query(
      `UPDATE videos
      SET title = $2, team = $3, year = $4
      WHERE id = $1
      RETURNING *;
      `,
      [id, updatedVideo.title, updatedVideo.team, updatedVideo.year]
    );
    return new Video(rows[0]);
  }
}
module.exports = { Video };

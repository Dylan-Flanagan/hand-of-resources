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
}

module.exports = { Video };

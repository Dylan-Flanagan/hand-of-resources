const pool = require('../utils/pool.js');

class Guitar {
  id;
  name;
  maker;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.maker = row.maker;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from guitars');

    return rows.map((guitarRow) => new Guitar(guitarRow));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from guitars where id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Guitar(rows[0]);
  }
  static async insert({ name, maker }) {
    const { rows } = await pool.query(
      `
       INSERT INTO guitars (name, maker)
       VALUES ($1, $2)
       RETURNING *
       `,
      [name, maker]
    );
    return new Guitar(rows[0]);
  }
}

module.exports = { Guitar };

const pool = require('../utils/pool.js');

class Pedal {
  id;
  name;
  maker;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.maker = row.maker;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from pedals');

    return rows.map((pedalRow) => new Pedal(pedalRow));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from pedals where id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Pedal(rows[0]);
  }
  static async insert({ name, maker }) {
    const { rows } = await pool.query(
      `
       INSERT INTO pedals (name, maker)
       VALUES ($1, $2)
       RETURNING *
       `,
      [name, maker]
    );
    return new Pedal(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const pedal = await Pedal.getById(id);
    if (!pedal) return null;
    const updatedPedal = { ...pedal, ...newAttrs };
    const { rows } = await pool.query(
      `UPDATE pedals
      SET name = $2, maker = $3
      WHERE id = $1
      RETURNING *;
      `,
      [id, updatedPedal.name, updatedPedal.maker]
    );
    return new Pedal(rows[0]);
  }
}
module.exports = { Pedal };

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
}

module.exports = { Pedal };

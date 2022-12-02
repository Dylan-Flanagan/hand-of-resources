const { Router } = require('express');
const { Film } = require('../models/Film.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const films = await Film.getAll();
    res.json(films);
  } catch (e) {
    next(e);
  }
});

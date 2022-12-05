const { Router } = require('express');
const { Guitar } = require('../models/Guitar.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const guitars = await Guitar.getAll();
    res.json(guitars);
  } catch (e) {
    next(e);
  }
});

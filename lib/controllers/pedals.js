const { Router } = require('express');
const { Pedal } = require('../models/Pedal.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const pedals = await Pedal.getAll();
    res.json(pedals);
  } catch (e) {
    next(e);
  }
});

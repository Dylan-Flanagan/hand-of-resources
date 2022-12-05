const { Router } = require('express');
const { Pedal } = require('../models/Pedal.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const pedals = await Pedal.getAll();
      res.json(pedals);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const pedal = await Pedal.getById(req.params.id);
      if (!pedal) {
        next();
      }
      res.json(pedal);
    } catch (e) {
      next(e);
    }
  });

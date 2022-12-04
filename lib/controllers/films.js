const { Router } = require('express');
const { Film } = require('../models/Film.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const films = await Film.getAll();
      res.json(films);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const film = await Film.getById(req.params.id);
      if (!film) {
        next();
      }
      res.json(film);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Film.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Film.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Film.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

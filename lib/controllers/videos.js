const { Router } = require('express');
const { Video } = require('../models/Video.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const videos = await Video.getAll();
      res.json(videos);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const video = await Video.getById(req.params.id);
      if (!video) {
        next();
      }
      res.json(video);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Video.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Video.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

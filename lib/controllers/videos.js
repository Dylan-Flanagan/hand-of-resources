const { Router } = require('express');
const { Video } = require('../models/Video.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const videos = await Video.getAll();
    res.json(videos);
  } catch (e) {
    next(e);
  }
});

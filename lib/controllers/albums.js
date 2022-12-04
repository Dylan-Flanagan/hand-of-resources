const { Router } = require('express');
const { Album } = require('../models/Album.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const albums = await Album.getAll();
    res.json(albums);
  } catch (e) {
    next(e);
  }
});

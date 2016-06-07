const express = require('express');

const route = express.Router();

route.get('/*', async (req, res, next) => {
  try {
    res.render('webApplication');
  } catch (err) {
    next(err);
  }
});

module.exports = route;

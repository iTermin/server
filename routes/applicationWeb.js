const express = require('express');

const homePage = require('../webApplication/homePage');

const route = express.Router();

route.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = route;

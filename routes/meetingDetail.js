const express = require('express');
const debug = require('debug')('ma:routes/meetingDetail');

const route = express.Router();

route.use((req, res, next) => {
  debug('Time: ', Date.now());
  next();
});


route.get('/', (req, res) => {
  res.render('answerGuest', { title: 'The index page!' });
});

module.exports = route;


const express = require('express');
const debug = require('debug')('ma:routes/meetingDetail');

const meetingHandler = require('../handler/meetingHandler');

const route = express.Router();

route.use((req, res, next) => {
  debug('Time: ', Date.now());
  next();
});


route.get('/:meetingId', async (req, res) => {
  const meetingId = req.params.meetingId;
  const meetingGeneralInfo = await meetingHandler.getMeetingDetail(meetingId)
  res.render('answerGuest', meetingGeneralInfo);
});

module.exports = route;


const express = require('express');
const debug = require('debug')('ma:routes/meetingDetail');

const meetingHandler = require('../handler/meetingHandler');

const route = express.Router();

route.use((req, res, next) => {
  debug('Time: ', Date.now());
  next();
});


route.get('/:meetingId', (req, res, next) => {
  const meetingId = req.params.meetingId;
  const meetingGeneralInfo = meetingHandler.getMeetingDetail(meetingId)
  .then((meetingGeneralInfo) => {
    debug("MeetingGeneralInfo", meetingGeneralInfo);
    res.render('answerGuest', meetingGeneralInfo);
  }).catch((err) => next(err));
});

module.exports = route;


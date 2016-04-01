const express = require('express');
const debug = require('debug')('ma:routes/meetingDetail');

const meetingHandler = require('../handler/meetingHandler');

const route = express.Router();

route.use((req, res, next) => {
  debug('Time: ', Date.now());
  next();
});


route.get('/:meetingId/:index', async (req, res) => {
  const meetingId = req.params.meetingId;
  const index = req.params.index;
  const meetingGeneralInfo = await meetingHandler.getMeetingDetail(meetingId)
  const meetingDetail = meetingGeneralInfo.guests[index].meetingDetail;

  debug('Rendering page of meeting:', meetingId, index);
  const info = { ...meetingGeneralInfo, meetingDetail, index };
  res.render('answerGuest', info);
});

module.exports = route;


const express = require('express');
const debug = require('debug')('ma:routes/meetingDetail');

const meetingHandler = require('../handler/meetingHandler');

const route = express.Router();

route.use((req, res, next) => {
  debug('Time: ', Date.now());
  next();
});


route.get('/:meetingId/:index', async (req, res, next) => {
  const meetingId = req.params.meetingId;
  const index = req.params.index;
  const status = Number(req.query.status) || 0;

  try {
    debug('Updating the status:', status);
    await meetingHandler.updateStatusForGuest(meetingId, index, status);
    const meetingGeneralInfo = await meetingHandler.getMeetingDetail(meetingId);
    const meetingDetail = meetingGeneralInfo.guests[index].meetingDetail;

    debug('Rendering page of meeting:', meetingId, index);
    const info = { ...meetingGeneralInfo, meetingDetail, index };
    res.render('answerGuest', info);
  } catch (err) {
    next(err);
  }
});

route.get('/:meetingId', async (req, res, next) => {
  const meetingId = req.params.meetingId;

  try {
    const meetingGeneralInfo = await meetingHandler.getMeetingDetail(meetingId);

    debug('Rendering page of meeting:', meetingId);
    res.render('meetingPreview', { ...meetingGeneralInfo });
  } catch (err) {
    next(err);
  }
});

module.exports = route;


const express = require('express');
const debug = require('debug')('ma:routes/scheduleMeeting');

const invitationHandler = require('../handler/invitationHandler');

const route = express.Router();

const currentMeetings = [];

route.use((req, res, next) => {
  debug('Time: ', Date.now());
  next();
});

/**
 * Create a new meeting into the system, sending the invitation to all the guests
 * @param meetingId Id of the crated meeting for a given user
 * */
route.post('/', async (req, res, next) => {
  const newMeetingInfo = req.body.meetingId.trim();
  try {
    if (!newMeetingInfo) throw new Error('Missing parameters');

    currentMeetings.push(newMeetingInfo);
    await invitationHandler.sendInvitationFromMeeting(newMeetingInfo);
    res.json({
      id: currentMeetings.length,
      message: 'Handling new meeting',
    });
  } catch (ex) {
    next(ex);
  }
});

route.get('/', (req, res) => {
  res.json({
    meetings: currentMeetings,
  });
});

module.exports = route;

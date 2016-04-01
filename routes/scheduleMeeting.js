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
route.post('/', (req, res) => {
  const newMeetingInfo = req.body.meetingId;
  if (newMeetingInfo) {
    currentMeetings.push(newMeetingInfo);
    invitationHandler.sendInvitationFromMeeting(newMeetingInfo);
    res.json({
      id: currentMeetings.length,
      message: 'Handling new meeting',
    });
  } else {
    res.status(406);
    res.json({
      error: 'Missing parameter',
    });
  }
});

/**
 * Once the meeting is updated, it sends the invitation to all the guests
 * @param meetingId Id of the crated meeting for a given user
 * */
route.put('/', (req, res) => {
  const newMeetingInfo = req.body.meetingId;

  const indexOfMeeting = currentMeetings.indexOf(newMeetingInfo);
  if (newMeetingInfo && indexOfMeeting >= 0) {
    invitationHandler.sendInvitationFromMeeting(newMeetingInfo);
    res.json({
      id: indexOfMeeting,
      message: 'Updated new meeting',
    });
  } else {
    res.status(406);
    res.json({
      error: 'Missing parameter',
    });
  }
});

route.get('/', (req, res) => {
  res.json({
    meetings: currentMeetings,
  });
});

module.exports = route;

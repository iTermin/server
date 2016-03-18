const express = require('express');
const debug = require('debug')('ma:routes/scheduleMeeting');

const route = express.Router();

const currentMeetings = [];

route.use((req, res, next) => {
  debug('Time: ', Date.now());
  next();
});

route.post('/', (req, res) => {
  const newMeetingInfo = req.body.meetingId;
  if(newMeetingInfo) {
    currentMeetings.push(newMeetingInfo);
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

route.get('/', (req, res) => {
  res.json({
    meetings: currentMeetings
  });
});

module.exports = route;

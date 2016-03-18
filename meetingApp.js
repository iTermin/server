const express = require('express');
const debug = require('debug')('ma:index');

const scheduleMeeting = require('./routes/scheduleMeeting');

const meetingApp = express();
meetingApp.use('/meeting', scheduleMeeting);
meetingApp.listen(3000, () => {
  debug('Live at Port 3000');
});

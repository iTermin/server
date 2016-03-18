const express = require('express');
const debug = require('debug')('ma:index');
const bodyParser = require('body-parser');

const scheduleMeeting = require('./routes/scheduleMeeting');

const meetingApp = express();
meetingApp.use(bodyParser.json());
meetingApp.use(bodyParser.urlencoded());
meetingApp.use('/meeting', scheduleMeeting);
meetingApp.listen(3000, () => {
  debug('Live at Port 3000');
});

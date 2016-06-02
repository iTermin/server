require('babel-polyfill');
require('es6-promise').polyfill();

const nconf = require('nconf');
const express = require('express');
const debug = require('debug')('ma:index');
const bodyParser = require('body-parser');
const path = require('path');

const scheduleMeeting = require('./routes/scheduleMeeting');
const meetingDetail = require('./routes/meetingDetail');
const applicationWeb = require('./routes/applicationWeb'); 

const filePath = path.join(__dirname, 'config.json');
nconf.argv().env().file(filePath);
const port = nconf.get('PORT');

const meetingApp = express();
meetingApp.set('view engine', 'ejs');
meetingApp.use(express.static('public'));
meetingApp.use(bodyParser.json());
meetingApp.use(bodyParser.urlencoded());
meetingApp.use('/meetingDetail', meetingDetail);
meetingApp.use('/meeting', scheduleMeeting);
meetingApp.use('/home', applicationWeb);

meetingApp.listen(port, () => {
  debug(`Live at Port ${port}`);
});

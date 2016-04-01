require('babel-polyfill');
require('es6-promise').polyfill();

const nconf = require('nconf');
const express = require('express');
const debug = require('debug')('ma:index');
const bodyParser = require('body-parser');

const scheduleMeeting = require('./routes/scheduleMeeting');

nconf.argv().env();
nconf.defaults({
  PORT: 3000,
  FIREBASE_PATH: 'https://fiery-fire-7264.firebaseio.com',
  MAILGUN_APPKEY: 'key-cf0bacb060ebc876c47bd242dc3b6496',
  MAILGUN_DOMAIN: 'sandbox0a454306817b460580ad9763ee18256b.mailgun.org',
  MAILGUN_FROM: 'Mailgun Sandbox <postmaster@sandbox0a454306817b460580ad9763ee18256b.mailgun.org>',
});

const port = nconf.get('PORT');

const meetingApp = express();
meetingApp.use(bodyParser.json());
meetingApp.use(bodyParser.urlencoded());
meetingApp.use('/meeting', scheduleMeeting);
meetingApp.listen(port, () => {
  debug(`Live at Port ${port}`);
});

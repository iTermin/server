require("babel-polyfill");
require('es6-promise').polyfill();

const nconf = require('nconf');
const express = require('express');
const debug = require('debug')('ma:index');
const bodyParser = require('body-parser');

const scheduleMeeting = require('./routes/scheduleMeeting');

nconf.argv().env();
nconf.defaults({ PORT: 3000 });

const port = nconf.get("PORT");

const meetingApp = express();
meetingApp.use(bodyParser.json());
meetingApp.use(bodyParser.urlencoded());
meetingApp.use('/meeting', scheduleMeeting);
meetingApp.listen(port, () => {
  debug(`Live at Port ${port}`);
});

const resolveToString = require('es6-template-strings/resolve-to-string');
const compile = require('es6-template-strings/compile');
const Firebase = require('firebase');
const debug = require('debug')('ma:handler:invitationHandler');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const mailHandler = require('./mailHandler');
const meetingHandler = require('./meetingHandler');
const nconf = require('nconf');

const filePath = path.join(__dirname, '../public/emailToGuest.html');
const templateText = fs.readFileSync(filePath, 'utf-8');
const compiled = compile(templateText);

function sendInvitationFromMeeting(meetingId) {
  meetingHandler.getMeetingDetail(meetingId)
  .then((meetingGeneralInfo) => {
    const { meetingInformation, hostName, subject, guests } = meetingGeneralInfo;
    for (let guestIndex = 1; guestIndex < guests.length; ++guestIndex) {
      const guest = guests[guestIndex];
      debug(`Sending information to the guest: ${guest.name}`);

      const html = resolveToString(compiled, guest.meetingDetail);
      mailHandler(guest.email, subject, html);
    }
  }).catch((err) => debug('Error sending invitations', err));
}

module.exports = { sendInvitationFromMeeting };

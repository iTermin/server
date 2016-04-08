const resolveToString = require('es6-template-strings/resolve-to-string');
const compile = require('es6-template-strings/compile');
const debug = require('debug')('ma:handler:invitationHandler');
const fs = require('fs');
const path = require('path');
const nconf = require('nconf');
const mailHandler = require('./mailHandler');
const meetingHandler = require('./meetingHandler');

const filePath = path.join(__dirname, '../public/emailToGuest.html');
const templateText = fs.readFileSync(filePath, 'utf-8');
const compiled = compile(templateText);

async function sendInvitationFromMeeting(meetingId) {
  const meetingGeneralInfo = await meetingHandler.getMeetingDetail(meetingId);
  const { subject, guests } = meetingGeneralInfo;
  for (let guestIndex = 1; guestIndex < guests.length; ++guestIndex) {
    const guest = guests[guestIndex];
    debug(`Sending information to the guest: ${guest.name}`);

    const baseURI = nconf.get('BASE_URI');
    const html = resolveToString(compiled, { ...guest.meetingDetail, baseURI });
    mailHandler(guest.email, subject, html);
  }
}

module.exports = { sendInvitationFromMeeting };

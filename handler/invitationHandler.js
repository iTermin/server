const resolveToString = require('es6-template-strings/resolve-to-string');
const compile = require('es6-template-strings/compile');
const debug = require('debug')('ma:handler:invitationHandler');
const fs = require('fs');
const path = require('path');
const nconf = require('nconf');
const mailHandler = require('./mailHandler');
const meetingHandler = require('./meetingHandler');
const ejs = require('ejs');

const filePath = path.join(__dirname, '../public/emailToGuest.html');


async function sendInvitationFromMeeting(meetingId) {
  const meetingGeneralInfo = await meetingHandler.getMeetingDetail(meetingId);
  const { subject, guests } = meetingGeneralInfo;
  for (let guestIndex = 1; guestIndex < guests.length; ++guestIndex) {
    const guest = guests[guestIndex];
    debug(`Sending information to the guest: ${guest.name}`);

    const baseURI = nconf.get('BASE_URI');
    const meetingURL = `${baseURI}/meetingDetail/${meetingId}/${guestIndex}`;
    ejs.renderFile(filePath, { ...meetingGeneralInfo, ...guest.meetingDetail, baseURI, meetingURL }, (error, html) => {
      mailHandler(guest.email, subject, html);
    });
  }
}

module.exports = { sendInvitationFromMeeting };

const resolveToString = require('es6-template-strings/resolve-to-string');
const compile = require('es6-template-strings/compile');
const Firebase = require('firebase');
const debug = require('debug')('ma:handler:invitationHandler');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const mailHandler = require('./mailHandler');
const nconf = require('nconf');

const filePath = path.join(__dirname, '../public/emailToGuest.html');
const templateText = fs.readFileSync(filePath, 'utf-8');
const compiled = compile(templateText);

function sendInvitationFromMeeting(meetingId) {
  const firebaseRef = new Firebase(nconf.get('FIREBASE_PATH'));
  firebaseRef.child(`Meetings/${meetingId}`).once('value', (dataSnapshot) => {
    const meetingInformation = dataSnapshot.val();
    const hostName = getMeetingHostName(meetingInformation);
    const subject = `${hostName}'s invitation`;
    const guests = getMeetingGuests(meetingInformation);
    for (let guestIndex = 1; guestIndex < guests.length; ++guestIndex) {
      const guest = guests[guestIndex];
      debug(`Sending information to the guest: ${guest.name}`);

      const html = getMeetingInformation(meetingInformation, guest, hostName);
      mailHandler(guest.email, subject, html);
    }
  }, (err) => {
    debug('Error connecting to Firebase', err);
  });
}

function getMeetingGuests(meetingInformation) {
  return meetingInformation.guests;
}

function getMeetingHostName(meetingInformation) {
  return meetingInformation.guests[0].name;
}

function getMeetingInformation(meetingInformation, guest, hostName) {
  const startDate = moment(meetingInformation.detail.startDate, 'DD-MM-YYYY HH:MM:SS Z');
  const endDate = moment(meetingInformation.detail.endDate, 'DD-MM-YYYY HH:MM:SS Z');

  const dateMeeting = startDate.format('LLLL');
  const nameMeeting = meetingInformation.detail.name;
  const guestName = guest.name;
  const durationMeeting = startDate.from(endDate, true);

  // TODO: Use real paths to confirm or reject the email (#18)
  const cancelURL = '#';
  const confirmURL = '#';
  return resolveToString(compiled, {
    guestName,
    hostName,
    dateMeeting,
    durationMeeting,
    nameMeeting,
    confirmURL,
    cancelURL,
  });
}

module.exports = { sendInvitationFromMeeting };

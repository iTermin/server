'use strict';

const resolveToString = require('es6-template-strings/resolve-to-string');
const compile = require("es6-template-strings/compile");
const Firebase = require("firebase");
const debug = require('debug')('ma:handler:invitationHandler');
const fs = require('fs');
const path = require('path');

const mailHandler = require('./mailHandler');

const templateText = fs.readFileSync(path.join(__dirname, '../emailMeeting/emailToGuest.html'), 'utf-8');
const compiled = compile(templateText);

function sendInvitationFromMeeting(meetingId) {
  // TODO: Extract to configuration file (#5)
  const firebaseRef = new Firebase("https://fiery-fire-7264.firebaseio.com");
  firebaseRef.child(`Meetings/${meetingId}`).once('value', function (dataSnapshot) {
    const meetingInformation = dataSnapshot.val();
    const hostName = getMeetingHostName(meetingInformation);
    const subject = `${hostName}'s invitation`;
    const guests = getMeetingGuests(meetingInformation);
    for(let guestIndex = 1; guestIndex < guests.length; ++guestIndex) {
      const guest = guests[guestIndex];
      debug(`Sending information to the guest: ${guest.name}`);

      const meetingHTML = getMeetingInformation(meetingInformation, guest, hostName);
      mailHandler(guest.email, subject, meetingHTML);
    }
  }, function (err) {
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
  // TODO: Use template (#8)
  const dateMeeting = meetingInformation.detail.startDate;
  const nameMeeting = meetingInformation.detail.name;
  const guestName = guest.name;
  const durationMeeting = '1 hour';

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
    cancelURL
  });
}

module.exports = { sendInvitationFromMeeting };
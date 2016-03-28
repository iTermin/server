'use strict';

const mailHandler = require('./mailHandler');
const Firebase = require("firebase");
const debug = require('debug')('ma:handler:invitationHandler');
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, '../emailMeeting/emailToGuest.html'), 'utf-8');

function sendInvitationFromMeeting(meetingId) {
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
  const meetingTime = meetingInformation.detail.startDate;
  const guestName = guest.name;
  return `<html><body><p>Hi ${guestName} you have been invited to the ${hostName}'s meeting at: ${meetingTime}</p></body></html>`;
}

module.exports = { sendInvitationFromMeeting };
'use strict';

const mailHandler = require('./mailHandler');
const Firebase = require("firebase");
const debug = require('debug')('ma:handler:invitationHandler');

function sendInvitationFromMeeting(meetingId) {
  const firebaseRef = new Firebase("https://fiery-fire-7264.firebaseio.com");
  firebaseRef.child(`Meetings/${meetingId}`).once('value', function (dataSnapshot) {
    const meetingInformation = dataSnapshot.val();

    const guests = getMeetingGuests(meetingInformation);
    const subject = getMeetingTitle(meetingInformation);
    const newMeetingInfo = getMeetingInformation(meetingInformation);

    // mailHandler(guests, subject, newMeetingInfo);
    debug('Information: ', dataSnapshot.val());
  }, function (err) {
    debug('Error connecting to Firebase', err);
  });
}

function getMeetingGuests(meetingInformation) {
  // TODO: Implement function
  return "fachinacg@gmail.com";
}

function getMeetingTitle(meetingInformation) {
  // TODO: Implement function
  return "Subject of the meeting";
}

function getMeetingInformation(meetingInformation) {
  // TODO: Implement function
  return 'Hi!';
}

module.exports = { sendInvitationFromMeeting };
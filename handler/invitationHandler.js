'use strict';

const mailHandler = require('./mailHandler');

function sendInvitationFromMeeting(meetingId) {
  const guests = getMeetingGuests(meetingId);
  const subject = getMeetingTitle(meetingId);
  const newMeetingInfo = getMeetingInformation(meetingId);

  mailHandler(guests, subject, newMeetingInfo);
}

function getMeetingGuests() {
  // TODO: Implement function
  return "fachinacg@gmail.com";
}

function getMeetingTitle() {
  // TODO: Implement function
  return "Subject of the meeting";
}

function getMeetingInformation(meetingId) {
  // TODO: Implement function
  return meetingId;
}

module.exports = { sendInvitationFromMeeting };
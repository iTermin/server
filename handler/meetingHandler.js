const Firebase = require('firebase');
const debug = require('debug')('ma:handler:meetingHandler');
const moment = require('moment');
const nconf = require('nconf');

const dateFormat = 'DD-MM-YYYY HH:mm:ss ZZ';

async function getMeetingDetail(meetingId) {
  const firebaseRef = new Firebase(nconf.get('FIREBASE_PATH'));
  const dataSnapshot = await firebaseRef.child(`Meetings/${meetingId}`).once('value');
  const meetingInformation = dataSnapshot.val();

  if (!meetingInformation) throw new Error('Invalid meeting');

  debug('Extracted information from meetingId', meetingId);

  const hostName = getMeetingHostName(meetingInformation);
  const subject = `${hostName}'s invitation`;
  const guests = getMeetingGuests(meetingInformation);

  const startDate = moment(meetingInformation.detail.startDate, dateFormat);
  const endDate = moment(meetingInformation.detail.endDate, dateFormat);
  const dateMeeting = startDate.format('LLLL');
  const nameMeeting = meetingInformation.detail.name;
  const durationMeeting = startDate.from(endDate, true);

  const formattedDetails = {
    startDate,
    endDate,
    dateMeeting,
    nameMeeting,
    durationMeeting,
  };

  for (let guestIndex = 1; guestIndex < guests.length; ++guestIndex) {
    const guest = guests[guestIndex];
    guest.meetingDetail = getGuestMeetingInformation(meetingInformation, guest);
  }

  return { meetingInformation, hostName, subject, guests, formattedDetails };
}

function updateStatusForGuest(meetingId, index, status) {
  const firebaseRef = new Firebase(nconf.get('FIREBASE_PATH'));
  return firebaseRef.child(`Meetings/${meetingId}/guests/${index}/`).update({ status });
}

function getMeetingGuests(meetingInformation) {
  return meetingInformation.guests;
}

function getMeetingHostName(meetingInformation) {
  return meetingInformation.guests[0].name;
}

function getGuestMeetingInformation(meetingInformation, guest) {
  const guestName = guest.name;

  return {
    guestName,
  };
}

module.exports = { getMeetingDetail, updateStatusForGuest };

const Firebase = require('firebase');
const debug = require('debug')('ma:handler:meetingHandler');
const moment = require('moment');
const nconf = require('nconf');

function getMeetingDetail(meetingId) {
  // TODO: Improve the usage of the promises
  return new Promise((resolve, reject) => {
    const firebaseRef = new Firebase(nconf.get('FIREBASE_PATH'));
    firebaseRef.child(`Meetings/${meetingId}`).once('value', (dataSnapshot) => {
      const meetingInformation = dataSnapshot.val();
      if (meetingInformation) {
        debug('Extracted information from meetingId', meetingId);

        const hostName = getMeetingHostName(meetingInformation);
        const subject = `${hostName}'s invitation`;
        const guests = getMeetingGuests(meetingInformation);

        // TODO: Use this information instead of the guets (#21)
        const startDate = moment(meetingInformation.detail.startDate, 'DD-MM-YYYY HH:MM:SS Z');
        const endDate = moment(meetingInformation.detail.endDate, 'DD-MM-YYYY HH:MM:SS Z');
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
          guest.meetingDetail = getGuestMeetingInformation(meetingInformation, guest, hostName);
        }
        resolve({ meetingInformation, hostName, subject, guests, formattedDetails });
      } else {
        reject('Invalid meeting');
      }
    }, (err) => {
      reject(err);
    });
  });
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

function getGuestMeetingInformation(meetingInformation, guest, hostName) {
  const startDate = moment(meetingInformation.detail.startDate, 'DD-MM-YYYY HH:MM:SS Z');
  const endDate = moment(meetingInformation.detail.endDate, 'DD-MM-YYYY HH:MM:SS Z');

  const dateMeeting = startDate.format('LLLL');
  const nameMeeting = meetingInformation.detail.name;
  const guestName = guest.name;
  const durationMeeting = startDate.from(endDate, true);

  const cancelURL = '#';
  const confirmURL = '#';
  return {
    guestName,
    hostName,
    dateMeeting,
    durationMeeting,
    nameMeeting,
    confirmURL,
    cancelURL,
  };
}

module.exports = { getMeetingDetail, updateStatusForGuest };

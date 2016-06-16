const debug = require('debug')('ma:handler:invitationHandler');
const nconf = require('nconf');
const ejs = require('ejs');

const mailHandler = require('./mailHandler');
const meetingHandler = require('./meetingHandler');

async function sendInvitationFromMeeting(meetingId) {
  const meetingGeneralInfo = await meetingHandler.getMeetingDetail(meetingId);
  const { subject, guests } = meetingGeneralInfo;
  for (let guestIndex = 1; guestIndex < guests.length; ++guestIndex) {
    const guest = guests[guestIndex];
    debug(`Sending information to the guest: ${guest.name}`);

    const baseURI = nconf.get('BASE_URI');
    const meetingURL = `${baseURI}/meetingDetail/${meetingId}/${guestIndex}`;
    ejs.renderFile('server/views/emailToGuest.ejs', {
      ...meetingGeneralInfo,
      ...guest.meetingDetail,
      baseURI, meetingURL,
    }, (error, html) => {
      if (error) throw error;

      mailHandler(guest.email, subject, html);
    });
  }
}

module.exports = { sendInvitationFromMeeting };

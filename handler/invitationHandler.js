const debug = require('debug')('ma:handler:invitationHandler');
const path = require('path');
const nconf = require('nconf');
const ejs = require('ejs');

const mailHandler = require('./mailHandler');
const meetingHandler = require('./meetingHandler');

const filePath = path.join(__dirname, '../views/emailToGuest.ejs');


async function sendInvitationFromMeeting(meetingId) {
  const meetingGeneralInfo = await meetingHandler.getMeetingDetail(meetingId);
  const { subject, guests } = meetingGeneralInfo;
  for (let guestIndex = 1; guestIndex < guests.length; ++guestIndex) {
    const guest = guests[guestIndex];
    debug(`Sending information to the guest: ${guest.name}`);

    const baseURI = nconf.get('BASE_URI');
    const meetingURL = `${baseURI}/meetingDetail/${meetingId}/${guestIndex}`;
    ejs.renderFile(filePath, {
      ...meetingGeneralInfo,
      ...guest.meetingDetail,
      baseURI, meetingURL,
    }, (error, html) => {
      if(error) throw error;

      mailHandler(guest.email, subject, html);
    });
  }
}

module.exports = { sendInvitationFromMeeting };

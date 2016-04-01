
const mailgun = require('mailgun-js');
const debug = require('debug')('ma:handler:mailHandler');

async function mailHandler(to, subject, html) {
  // TODO: Implement RC https://github.com/dominictarr/rc (#5)
  const apiKey = 'key-cf0bacb060ebc876c47bd242dc3b6496';
  const domain = 'sandbox0a454306817b460580ad9763ee18256b.mailgun.org';
  const from = 'Mailgun Sandbox <postmaster@sandbox0a454306817b460580ad9763ee18256b.mailgun.org>';


  const client = mailgun({ apiKey, domain });
  const data = { from, to, subject, html };

  debug('Sending email: ', data);
  try {
    const response = await client.messages().send(data);
    debug('Sent message with response: ', response);
  } catch (error) {
    debug('Error sending message: ', error);
  }
}


module.exports = mailHandler;

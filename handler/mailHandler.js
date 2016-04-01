
const mailgun = require('mailgun-js');
const debug = require('debug')('ma:handler:mailHandler');
const nconf = require('nconf');

async function mailHandler(to, subject, html) {
  const apiKey = nconf.get('MAILGUN_APIKEY');
  const domain = nconf.get('MAILGUN_DOMAIN');
  const from = nconf.get('MAILGUN_FROM');

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

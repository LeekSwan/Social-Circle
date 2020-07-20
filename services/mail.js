const mailClient = require('../mail/sendgrid.js')

async function sendTestEmailToMyself (myPersonalEmail) {
  const msg = {
    to: myPersonalEmail,
    from: myPersonalEmail,
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  }
  return mailClient.send(msg)
}

module.exports = {
  sendTestEmailToMyself
}

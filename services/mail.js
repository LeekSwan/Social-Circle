const mailClient = require('../mail/sendgrid.js')
const { buildNewFriendEmail, buildNewUserEmail } = require('../mail/emailTemplates.js')

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

async function sendNewUserEmail (data) {
  const msg = {
    to: data.email,
    from: process.env.EMAIL_SENDER_ADDRESS,
    subject: 'Invitation To Social Circle',
    text: 'Invitation To Social Circle',
    html: buildNewUserEmail(data.firstName, data.lastName, data.secret)
  }
  return mailClient.send(msg)
}

async function sendNewFriendEmail (data) {
  const msg = {
    to: data.friendEmail,
    from: process.env.EMAIL_SENDER_ADDRESS,
    subject: 'Invitation To Social Circle',
    text: 'Invitation To Social Circle',
    html: buildNewFriendEmail(data.firstName, data.lastName, data.friendFName, data.friendLName, data.secret)
  }
  return mailClient.send(msg)
}

module.exports = {
  sendTestEmailToMyself,
  sendNewUserEmail,
  sendNewFriendEmail
}

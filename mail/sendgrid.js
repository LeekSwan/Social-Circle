// https://app.sendgrid.com/guide/integrate/langs/nodejs

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function send (msg) {
  if (process.env.SEND_EMAIL === 'true') {
    return sgMail.send(msg)
  }
}

module.exports = { send }

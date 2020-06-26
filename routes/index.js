const express = require('express')
const router = express.Router()
const db = require('../db/index.js')
const mailClient = require('../mail/index.js')

router.get('/test', function (req,res) {
    res.send('works for me')
})

router.get('/test-db', function(req,res) {
    const query = 'Select * from users';
    db.query(query)
    .then(results => {
        res.send(results.rows)
    })
})

router.get('/test-mail', function(req,res) {
    console.log('GET /test-mail')
    const msg = {
      to: 'jasonyu6154@gmail.com',
      from: 'jasonyu6154@gmail.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    mailClient
        .send(msg)
        .then(() => {
            console.log('sent test message without errors')
            res.status(202).send('ok sent');
        }, error => {
            console.error(error)
            if (error.response) {
                console.error(error.response.body)
            }
            res.status(error.code).send(error)
    })
})

module.exports = router

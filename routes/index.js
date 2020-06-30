
const express = require('express')
const router = express.Router()
const db = require('../db')
const mailClient = require('../mail/index.js')
var bodyParser = require("body-parser");
router.use(bodyParser.json())
const { v4: uuidv4 } = require('uuid');


router.get('/test', function (req,res) {
  res.send('works for me')
})

router.get('/test-db', function(req,res) {
  const query = 'Select * from users'
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
      res.status(202).send('ok sent')
    }, error => {
      console.error(error)
      if (error.response) {
        console.error(error.response.body)
      }
      res.status(error.code).send(error)
  })
})

// Route for login/adding new user
router.post('/api/users', function(req,res){
  const { firstname, lastname, email } = req.body
  const secret = uuidv4();

  if (!firstname || !lastname || !email) {
    alert('Input field empty');
    return res.status(400).send('Input field empty');
  }
  const query = {
    text: 'INSERT INTO users(firstname, lastname, email, secret) VALUES ($1, $2, $3, $4)',
    values: [firstname.toLowerCase(), lastname.toLowerCase(), email.toLowerCase(), secret],
  }
  db.query(query)
  .then(result => {
    res.send([firstname, lastname, email, secret])
  })
  .catch(err => {
    res.status(400).json(err);
  })
})


// Route for getting user data from secret
router.get('/api/user/:secret',  function(req, res) {

  const query = 'Select * from users WHERE secret='
  db.query(query)
  .then(results => {
    res.send(results.rows)
  })


})




// Route for adding friends
router.post('/api/friendships', function(req, res) {
  const { firstname, lastname, email } = req.body



})



module.exports = router

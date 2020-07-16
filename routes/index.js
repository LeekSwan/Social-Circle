const express = require('express')
const router = express.Router()
const db = require('../db')
const mailClient = require('../mail/index.js')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const que = require('./queries')
const pro = require('./dataprocess.js')
const { addUser } = require('./queries')
router.use(bodyParser.json())

router.get('/test', function (req, res) {
  res.send('works for me')
})

router.get('/test-db', function (req, res) {
  const query = 'Select * from users'
  db.query(query)
    .then(results => {
      res.send(results.rows)
    })
})

router.get('/test-mail', function (req, res) {
  console.log('GET /test-mail')
  const msg = {
    to: 'jasonyu6154@gmail.com',
    from: 'jasonyu6154@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
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
// If request is missing parameters, returns 400
// If request is for existing user, returns 409
// Else, creates user and returns 201 along with user secret
router.post('/api/users', async function (req, res) {
  const { firstname, lastname, email } = req.body
  const secret = uuidv4()

  if (!firstname || !lastname || !email) {
    console.log('Input field empty')
    return res.status(400).send('Input field empty')
  }

  const result = await que.emailAlreadyRegistered(email)
  if (result) {
    res.status(409).send()
  } else {
    que.addUser(firstname, lastname, email, secret)
      .then(() => {
        res.send({ secret: secret })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
})

// Route for getting user data from secret
router.get('/api/user/:secret', function (req, res) {
  que.getUserData(req.params.secret)
    .then(results => {
      res.send(pro.formatUserData(results))
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

router.post('/api/friendships', async function (req, res) {
  const { userid, friendfname, friendlname, friendemail } = req.body
  const secret = uuidv4()

  // Get user Id
  let friendId
  const userExists = await que.emailAlreadyRegistered(friendemail)
  if (userExists) {
    friendId = await que.getUserId(friendemail)
  } else {
    friendId = await que.addUser(friendfname, friendlname, friendemail, secret)
  }
    
  // Add friend
  if (userExists) {
    const friendshipExists = await que.checkFriendshipExists(userid, friendemail)
    if (friendshipExists) {
      console.log('friendship exists')
      return res.status(409).send()
    }
  }

  que.addFriend(userid, friendId.rows[0].id)
  .then(() => {       
    res.status(201).send()
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

module.exports = router

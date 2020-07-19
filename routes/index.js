const express = require('express')
const router = express.Router()
const db = require('../db')
const mailClient = require('../mail/index.js')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const que = require('./queries')
const pro = require('./dataprocess.js')
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
  const { firstName, lastName, email } = req.body
  const secret = uuidv4()

  if (!firstName || !lastName || !email) {
    console.log('Input field empty')
    return res.status(400).send('Input field empty')
  }

  const emailRegistered = await que.emailAlreadyRegistered(email)
  if (emailRegistered) {
    res.status(409).send()
  } else {
    que.addUser(firstName, lastName, email, secret)
      .then(() => {
        res.status(201).send({ secret: secret })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
})

// Route for getting user data from secret
router.get('/api/user/:secret', function (req, res) {
  que.getUserBySecret(req.params.secret)
    .then(results => {
      res.send(pro.formatUserData(results))
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// TODO: check if friend added is the user itself
router.post('/api/friendships', async function (req, res) {
  const { userId, friendFName, friendLName, friendEmail } = req.body
  const secret = uuidv4()

  // Get user Id
  let friendId
  const userExists = await que.emailAlreadyRegistered(friendEmail)
  if (userExists) {
    friendId = await que.getUserIdByEmail(friendEmail)
  } else {
    friendId = await que.addUser(friendFName, friendLName, friendEmail, secret)
  }

  // Add friend
  if (userExists) {
    const friendshipExists = await que.checkFriendshipExists(userId, friendEmail)
    if (friendshipExists) {
      return res.status(409).send()
    }
  }

  que.addFriend(userId, friendId.rows[0].id)
    .then(() => {
      res.status(201).send()
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// Route for deleting user accounts and friendships
router.delete('/api/delete/user/:secret', function (req, res) {
  console.log(req.params.secret)
  que.deleteUserAndFriendships(req.params.secret)
    .then(() => {
      res.status(200).send()
    })
})

// Route for deleting specific friendships from users account
router.delete('/api/delete/friendship', function (req, res) {
  const {user1, user2} = req.body
  

})



module.exports = router

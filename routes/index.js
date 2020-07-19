const express = require('express')
const router = express.Router()
const UserService = require('../services/users')
const MailService = require('../services/mail')
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.get('/test', function (req, res) {
  res.send('works for me')
})

router.get('/test-db', async function (req, res) {
  // pretty print JSON
  res.header("Content-Type",'application/json')
  res.send(JSON.stringify(await UserService.test(), null, 4));
})

router.get('/test-mail', function (req, res) {
  const myEmail = ''
  let sendEmail = false
  // sendEmail = true
  if (!sendEmail) {
    return res.send('sendEmail must be turned on manually')
  }
  MailService.sendTestEmailToMyself(myEmail)
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

// Route for new user signup
// If request is missing parameters, returns 400
// If request is for existing user, returns 409
// Else, creates user and returns 201 along with user secret
router.post('/api/users', async function (req, res) {
  const { firstName, lastName, email } = req.body

  if (!firstName || !lastName || !email) {
    console.log('Input field empty')
    return res.status(400).send('Input field empty')
  }

  const emailRegistered = await UserService.checkEmailAlreadyRegistered(email)
  if (emailRegistered) {
    res.status(409).send()
  } else {
    UserService.signup(firstName, lastName, email)
      .then((secret) => {
        res.status(201).send({ secret: secret })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
})

// Route for getting user data from secret
router.get('/api/user/:secret', function (req, res) {
  const { secret } = req.params
  UserService.login(secret)
    .then(userData => {
      res.status(200).send(userData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// TODO: check if friend added is the user itself
router.post('/api/friendships', async function (req, res) {
  const { userId, friendFName, friendLName, friendEmail } = req.body
  UserService.addFriend(userId, friendFName, friendLName, friendEmail)
    .then(() => {
      res.status(201).send()
    })
    .catch(err => {
      if (err.message === 'friendshipExists') {
        return res.status(409).send()
      }
      console.log(err)
      res.status(500).json(err)
    })
})

// Route for deleting user accounts and friendships
router.delete('/api/delete', function (req, res) {

})

module.exports = router

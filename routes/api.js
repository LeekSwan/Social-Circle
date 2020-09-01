const api = require('express').Router()
const UserService = require('../services/users')
const UserMergeService = require('../services/UserMergeService')
const bodyParser = require('body-parser')
api.use(bodyParser.json())

// Route for new user signup
// If request is missing parameters, returns 400
// If request is for existing user, returns 409
// Else, creates user and returns 201 along with user secret
api.post('/users', async function (req, res) {
  const { firstName, lastName, email } = req.body
  if (!firstName || !lastName || !email) {
    return res.status(400).send('Input field empty')
  }
  UserService.signup(firstName, lastName, email)
    .then((secret) => {
      res.status(201).send({ secret: secret })
    })
    .catch(err => {
      if (err.message === 'emailRegistered') {
        return res.status(409).send()
      }
      console.log(err)
      return res.status(500).json(err)
    })
})

// Route for getting user data from secret
api.get('/user/:secret', function (req, res) {
  const { secret } = req.params
  UserService.login(secret)
    .then(userData => {
      res.status(200).send(userData)
    })
    .catch(err => {
      if (err.message === 'invalidSecret') {
        return res.status(404).send()
      }
      console.log(err)
      return res.status(500).json(err)
    })
})

// Route for getting exposure count for user
api.get('/user/:secret/exposure', async function (req, res) {
  const { secret } = req.params
  UserService.getSocialCircle(secret)
    .then((userCircle) => {
      res.status(200).json({ exposure: userCircle.size })
    })
})

// Route for adding friendships
// TODO: check if friend added is the user itself
api.post('/friendships', async function (req, res) {
  const { userId, firstName, lastName, friendFName, friendLName, friendEmail } = req.body
  if (!userId || !firstName || !lastName || !friendFName || !friendLName || !friendEmail) {
    return res.status(400).send('Input field empty')
  }
  UserService.addFriend(userId, firstName, lastName, friendFName, friendLName, friendEmail)
    .then((friendId) => {
      res.status(201).send(friendId)
    })
    .catch(err => {
      if (err.message === 'friendshipExists') {
        return res.status(409).send()
      }
      console.log(err)
      return res.status(500).json(err)
    })
})

// Route for deleting user accounts and friendships
api.delete('/user/:secret', function (req, res) {
  const { secret } = req.params
  UserService.deleteUserAndFriends(secret)
    .then(() => {
      res.status(200).send()
    })
})

// Route for removing friendship
api.delete('/friendships/user/:secret', async function (req, res) {
  const { userId, friendId } = req.body
  const { secret } = req.params
  UserService.removeFriend(userId, friendId, secret)
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

// Route for merging accounts
api.put('/user/:secret', async function (req, res) {
  const { secret } = req.params
  const { mergeUrl } = req.body
  const mergeSecret = mergeUrl.split('/user/')[1]

  // Checks for invalid url and prevents merging into itself
  if (mergeSecret === undefined || secret === mergeSecret) {
    return res.status(400).send('Bad url')
  }

  // Checks for existing account
  const userIds = await UserService.getUserIdsFromSecrets([mergeSecret, secret])
  if (userIds[mergeSecret] === null || userIds[secret] === null) {
    console.log(userIds[mergeSecret])
    console.log(userIds[secret])
    return res.status(404).send()
  }
  UserMergeService.mergeAccounts(userIds[mergeSecret], userIds[secret])
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      console.log(err)
      if (err.message === 'accountHasBeenMerged') {
        return res.status(409).send()
      }
      return res.status(500).json(err)
    })
})

module.exports = api

const express = require('express')
const router = express.Router()
const db = require('../db')
const mailClient = require('../mail/index.js')
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const { v4: uuidv4 } = require('uuid')

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
// Else, creates user and returns 201 along with user data
router.post('/api/users', async function (req, res) {
  const { firstname, lastname, email } = req.body
  const secret = uuidv4()

  if (!firstname || !lastname || !email) {
    console.log('Input field empty')
    return res.status(400).send('Input field empty')
  }
  // Checks for duplicate
  const result = await emailAlreadyRegistered(email)
  if (result) {
    res.status(409).send({ message: 'exist' })
  } else {
    const insertUser = {
      text: 'INSERT INTO users(firstname, lastname, email, secret) VALUES ($1, $2, $3, $4)',
      values: [firstname.toLowerCase(), lastname.toLowerCase(), email.toLowerCase(), secret]
    }
    db.query(insertUser)
      .then(result => {
        res.send({ secret: secret })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
})

// Helper function for checking user duplicates using email
// Goes through database and counts where email matches
async function emailAlreadyRegistered (email) {
  const checkdup = {
    text: 'SELECT COUNT(email) FROM users WHERE email = $1',
    values: [email.toLowerCase()]
  }
  const result = await db.query(checkdup)
  return (result.rows[0].count > 0)
}

// Route for getting user data from secret
router.get('/api/user/:secret', function (req, res) {
  const getUserData = {
    text: 'SELECT users.id, users.firstname, users.lastname, u.firstname AS friendfname, u.lastname As friendlname ' +
            'FROM users ' +
            'LEFT JOIN friendships AS f ON  f.user1 = users.id ' +
            'LEFT JOIN users as u ON f.user2 = u.id WHERE users.secret = $1',
    values: [req.params.secret]
  }
  db.query(getUserData)
    .then(results => {
      // console.log(formatUserData(results))
      res.send(formatUserData(results))
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// Helper function for /api/user/:secret
// Takes in res data and formats it to user first name, user last name, friends list
function formatUserData (res) {
  const userData = {}
  const friends = res.rows
  const flist = []
  if (friends[0].friendfname == null) {
    flist[0] = 'You currently have no friends'
  } else {
    for (let i = 0; i < friends.length; i++) {
      const fname = friends[i].friendfname.charAt(0).toUpperCase() + friends[i].friendfname.slice(1)
      const lname = friends[i].friendlname.charAt(0).toUpperCase() + friends[i].friendlname.slice(1)
      flist[i] = fname + ' ' + lname
    }
  }
  userData.id = friends[0].id
  userData.firstname = friends[0].firstname.charAt(0).toUpperCase() + friends[0].firstname.slice(1)
  userData.lastname = friends[0].lastname.charAt(0).toUpperCase() + friends[0].lastname.slice(1)
  userData.friendslist = flist
  return userData
}

// Route for adding friends
router.post('/api/friendships', async function (req, res) {
  const { userid, friendfname, friendlname, friendemail } = req.body
  const secret = uuidv4()

  // Checks to see if friendee is already a user
  const result = await emailAlreadyRegistered(friendemail)
  if (!result) { // Friend is not a user, insert user into query and return user id
    const insertUser = {
      text: 'INSERT INTO users(firstname, lastname, email, secret) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [friendfname.toLowerCase(), friendlname.toLowerCase(), friendemail.toLowerCase(), secret]
    }
    db.query(insertUser)
      .then(result => {
        addFriend(userid, result.rows[0].id)
        res.status(200).send()
      })
      .catch(err => {
        res.status(500).json(err)
      })
  } else { // friend is already a user, check if friendship alreayd exists. If not, add friendship
    const checkExistingFriendship = {
      text: 'SELECT user1, u1.firstname, u1.email, user2, u2.firstname, u2.email FROM friendships ' +
      'LEFT JOIN users as u1 ON  friendships.user1 = u1.id ' +
      'LEFT JOIN users as u2 ON friendships.user2 = u2.id WHERE user1 = $1 AND u2.email = $2',
      values: [userid, friendemail]
    }
    db.query(checkExistingFriendship)
      .then(result => {
        if (result.rows.length !== 0) { // If length of rows  != 0, that means there is an existing friendship between 2 users
          res.status(409).send() // I still cant read message after a 409 error should I maybe use a
        } else {
          const getFriendId = { // gets friend user id from email
            text: 'SELECT id FROM users WHERE users.email = $1',
            values: [friendemail]
          }
          db.query(getFriendId)
            .then(result => {
              addFriend(userid, result.rows[0].id)
              res.status(200).send()
            })
            .catch(err => {
              res.status(500).json(err)
            })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
})

// Helper function for /api/friendships to add friends
function addFriend (user1, user2) {
  const addFriendship = {
    text: 'INSERT INTO friendships(user1, user2) VALUES ($1, $2) ',
    values: [user1, user2]
  }
  db.query(addFriendship)
}

module.exports = router

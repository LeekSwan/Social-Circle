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
router.post('/api/users', function (req, res) {
  const { firstname, lastname, email } = req.body
  const secret = uuidv4()

  if (!firstname || !lastname || !email) {
    console.log('Input field empty')
    return res.status(400).send('Input field empty')
  }

  CheckDup(email)
  .then((data) => {
    console.log(data)
  })
  
  // // Checks for duplicate
  // const checkdup = {
  //   text: 'SELECT COUNT(email) FROM users WHERE email = $1',
  //   values: [email.toLowerCase()]
  // }
  // db.query(checkdup)
  //   .then(result => {
  //     //Checks for duplicates. Query returns counts where email is user's  input email. If count is > 1, then there is a duplicate. 
  //     if (result.rows[0].count != 0) {
  //       console.log(result.rows[0].count)
  //       res.status(409).send({message:"exist"})
  //     } else {

  //       // Insert user data
  //       const query = {
  //         text: 'INSERT INTO users(firstname, lastname, email, secret) VALUES ($1, $2, $3, $4)',
  //         values: [firstname.toLowerCase(), lastname.toLowerCase(), email.toLowerCase(), secret]
  //       }
  //       db.query(query)
  //         .then(result => {
  //           res.send([firstname, lastname, email, secret])
  //         })
  //         .catch(err => {
  //           res.status(500).json(err)
  //         })

  //     }
  //   })
 
  
})



async function CheckDup(email) {
  const checkdup = {
    text: 'SELECT COUNT(email) FROM users WHERE email = $1',
    values: [email.toLowerCase()]
  }

  return await db.query(checkdup)
  .then(function(result) {
    return result.rows[0].count
  })
  

}


// Route for getting user data from secret
router.get('/api/user/:secret', function (req, res) {
  const query = {
    text: 'Select * FROM users WHERE secret = $1',
    values: [req.params.secret]
  }
  db.query(query)
    .then(results => {
      res.send(results.rows)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// Route for adding friends
router.post('/api/friendships', function (req, res) {
  // const { firstname, lastname, email } = req.body

  // check if duplicate

  // add to query


})

module.exports = router

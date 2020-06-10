var express = require('express')
var router = express.Router()
var db = require('../db/postgres.js')

// // define the home page route
// router.get('/', function (req, res) {
//   res.send('Sign up page   ')
// })

// define the about route
// router.get('/:userId', function (req, res) {
//   res.send('user Id')
// })

router.get('/test', function(req,res) {
  
  db.query(
      'Select * from users'
  ) .then(results => {
    res.send(results.rows[0]);
  })

})






module.exports = router

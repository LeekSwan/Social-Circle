var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('Sign up page   ')
})
// define the about route
router.get('/:userId', function (req, res) {
    


    
  res.send('user Id')
})

module.exports = router
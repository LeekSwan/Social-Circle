var express = require('express')
var router = express.Router()
var db = require('../db/index.js')

// // define the home page route
// router.get('/', function (req, res) {
//   res.send('Sign up page   ')
// })

// define the about route
// router.get('/:userId', function (req, res) {
//   res.send('user Id')
// })

router.get('/test', function(req,res) {
    const query = 'Select * from users';
    db.query(query)
    .then(results => {
        res.send(results.rows);
    })
})

module.exports = router

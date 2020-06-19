var express = require('express')
var router = express.Router()
var db = require('../db/index.js');
const { query } = require('express');


router.get('/', function(req,res) {
    console.log.("get route / is here")

})



// Route to get sql data
router.get('/test', function(req,res) {
    const query = 'Select * from users';
    db.query(query)
    .then(results => {
        res.send(results.rows);
    })
})

// Route for login/adding new user
router.post('api/users', function(req,res){
    const { firstname, lastname, email } = req.body
    const query = ('INSERT INTO users (firstname, lastname, email) VALUES ($1, $2, $3)', [firstname, lastname, email])
    db.query(query)
    .then(results => {
        response.status(201).json({ status: 'success', message: 'User added' })
    })
})


module.exports = router

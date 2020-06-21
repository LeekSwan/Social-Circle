var express = require('express')
var router = express.Router()
var db = require('../db/index.js');
const { query } = require('express');
var bodyParser = require("body-parser");
router.use(bodyParser.json())

router.get('/', function(req,res) {
    console.log("get route / is here")

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
router.post('/api/users', function(req,res){
    const { firstname, lastname, email } = req.body
    const name = 'insert new user';
    const sql = "INSERT INTO users(firstname, lastname, email) VALUES ($1, $2, $3)";
    const value = [firstname, lastname, email];
    db.query({name, sql, value})
    .then(results => {
        console.log("data sent to db")
    })
})


module.exports = router

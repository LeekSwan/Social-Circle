var express = require('express')
var router = express.Router()
var db = require('../db/index.js');
const { query } = require('express');
var bodyParser = require("body-parser");
router.use(bodyParser.json())

router.get('/test', function (req,res) {
    res.send('works for me');
})

router.get('/test-db', function(req,res) {
    const query = 'Select * from users';
    db.query(query)
    .then(results => {
        res.send(results.rows);
    })
})

// Route for login/adding new user
router.post('/api/users', function(req,res){
    console.log("data got to express")


    const { firstname, lastname, email } = req.body

    // const name = 'Add new user';
    // const sql = "INSERT INTO users(firstname, lastname, email) VALUES ($1, $2, $3)";
    // const value = [firstname, lastname, email];
    // db.query({name, sql, value})

    const query = {
        text: 'INSERT INTO users(firstname, lastname, email) VALUES ($1, $2, $3)',
        values: [firstname, lastname, email],
    }

    db.query(query)
    .then(results => {
        console.log("data sent to db")
        console.log(results)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
    res.status(201).send('OK');
})


module.exports = router

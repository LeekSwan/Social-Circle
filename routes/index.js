var express = require('express')
var router = express.Router()
var db = require('../db/index.js');
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
    console.log('POST request to /api/users')
    const { firstname, lastname, email } = req.body
    const query = {
        text: 'INSERT INTO users(firstname, lastname, email) VALUES ($1, $2, $3)',
        values: [firstname, lastname, email],
    }
    console.log(query)

    db.query(query)
    .then(results => {
        console.log('data sent to db')
        res.status(201).send('OK');
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})


module.exports = router

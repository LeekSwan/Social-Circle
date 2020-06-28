var express = require('express')
var router = express.Router()
var db = require('../db/index.js');
var bodyParser = require("body-parser");
router.use(bodyParser.json())
const { v1: uuidv1 } = require('uuid');


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
    const { firstname, lastname, email } = req.body

    if (!firstname || !lastname || !email) {
        res.status(400).send('Input field empty');
        alert('Input field empty');
      } else {
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
    }
})


module.exports = router

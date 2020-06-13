var express = require('express')
var router = express.Router()
var db = require('../db/index.js')


router.get('/test', function(req,res) {
    const query = 'Select * from users';
    db.query(query)
    .then(results => {
        res.send(results.rows);
    })
})

module.exports = router

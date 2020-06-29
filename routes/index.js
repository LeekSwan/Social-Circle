const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/test', function (req,res) {
    res.send('works for me')
})

router.get('/test-db', function(req,res) {
    const query = 'Select * from users'
    db.query(query)
    .then(results => {
        res.send(results.rows)
    })
})

module.exports = router

var express = require('express')
var router = express.Router()
var db = require('../db/index.js')



// Route to get sql data
router.get('/test', function(req,res) {
    const query = 'Select * from users';
    db.query(query)
    .then(results => {
        res.send(results.rows);
    })
})

// Route for login/adding new user
router.post('/POST/api/users', function(req,res){
    // const values = [req.body.firstname,
    //                 req.body.lastname,
    //                 req.body.email]

    // db.query(`INSERT INTO users(firstname, lastname, email)
    //           VALUES($1, $2, $3)`, values,
    //           (q_err, q_res) => {
    //             res.json(q_res.rows)
    //   })

    const { firstname, lastname, email } = req.body

    pool.query('INSERT INTO users (firstname, lastname, email) VALUES ($1, $2, $3)', [firstname, lastname, email], (error, results) => {
        if (error) {
        throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
  })
})

app.post('/users', (request, response) => {
    pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
        if (error) throw error;
 
        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});


module.exports = router

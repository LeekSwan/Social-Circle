if (process.env.NODE_ENV == 'dev') {
    console.log('Dev environment detected! :)')
    require('dotenv').config()
}

const express = require('express')
const path = require('path');

const app = express()
const port = process.env.PORT || 3000


var index_router = require('./routes/index.js')

// Leave out react stuff for heroku black triangle
// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', index_router)

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

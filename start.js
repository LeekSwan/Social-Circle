const express = require('express')
const path = require('path');

const app = express()
const port = 3000


var index_router = require('./routes/index.js')

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', index_router)

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
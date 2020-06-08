const express = require('express')
const app = express()
const port = 3000


var index_router = require('./routes/index.js')

app.use('/', index_router)

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
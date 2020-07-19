// Set NODE_ENV to 'dev' by default
if (!('NODE_ENV' in process.env)) {
  process.env.NODE_ENV = 'dev'
  console.log('Automatically setting NODE_ENV to `dev`')
}
// Load local .env file in dev environments
if (process.env.NODE_ENV === 'dev') {
  console.log('Dev environment detected! :) // loading .env file')
  require('dotenv').config()
}

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const indexRouter = require('./routes/index.js')
const apiRouter = require('./routes/api.js')

const app = express()
const port = process.env.PORT || 8080

// Log all HTTP requests
app.use(morgan('dev'))

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Serve the express routes
app.use('/api', apiRouter) // Forward all /api/... routes to apiRouter
app.use('/', indexRouter)

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.listen(port, () => console.log(`Express app listening at http://localhost:${port}`))

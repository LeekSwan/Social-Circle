// < DO THIS BEFORE RUNNING >
// IF RUNNING PRODUCTION
// - get DATABASE_URL from Heroku and set it in .env as PG_CONNECTION_STRING
// - drop heroku database using pg:reset
// IF RUNNING LOCALLY
// - set .env.PG_CONNECTION_STRING with format postgres://user:secret@localhost:5432/mydatabasename
// - comment out script.ssl in db/config.js
// - drop local database

console.log('-----BEGIN script:setupDatabaseFromEmpty-----')

console.log('Loading process.env')
require('dotenv').config()

const { getClient } = require('../db/postgres')
const pgm = require('node-pg-migrate')

async function run () {
  console.log('Begin run')
  // Load PG_CONNECTION_STRING into process.env

  // set NODE_ENV to script
  process.env.NODE_ENV = 'script'

  // connect to database
  const client = await getClient()

  // setup the database
  // using migration script
  await pgm.default({
    dbClient: client,
    direction: 'up',
    dir: 'migrations'
  })

  console.log('Migration complete')

  const clientClosed = client.end().then(() => console.log('> Client connection closed'))
  await clientClosed
}

run()

console.log('-----END script:setupDatabaseFromEmpty-----')

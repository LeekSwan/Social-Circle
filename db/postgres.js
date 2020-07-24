const { Client } = require('pg')
const { getConfig } = require('./config')

let client = null

// Returns a Promise for a connected PG Client instance
// If no client exists, it creates one
// Otherwise, returns existing client (cached)
// NOTE: Be sure to await or .then(), else you will be very confused
async function getClient () {
  if (client) {
    return client
  }

  try {
    const dbConfig = getConfig()
    client = new Client(dbConfig)
    await client.connect()
    return client
  } catch (err) {
    console.log('Error when connecting to PG:')
    console.err(err.message)
    return null
  }
}

function clientExists () {
  return client !== null
}

module.exports = { getClient, clientExists }

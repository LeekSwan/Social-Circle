const { getClient, clientExists } = require('./postgres')

async function query (text) {
  const client = await getClient()
  return client.query(text)
}

async function disconnect () {
  if (clientExists()) { // check that client exists before getting client
    const client = await getClient() // otherwise, it'll create a new one
    console.log('disconnecting ', client)
    return client.end()
  }
}

module.exports = { query, disconnect }

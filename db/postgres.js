const { Client } = require('pg')

function getClient () {
  let dbConfig = {}
  if (process.env.NODE_ENV === 'production') {
    if ('DATABASE_URL' in process.env) {
      dbConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    } else {
      console.log('(prod) process.env.DATABASE_URL does not exist --> skipping db')
      console.log('(prod) If this is a review app, you must manually add the config var in Heroku')
    }
  } else if (process.env.NODE_ENV === 'dev') {
    dbConfig = {
      user: process.env.PG_LOCAL_USER,
      host: process.env.PG_LOCAL_HOST,
      database: process.env.PG_LOCAL_DATABASE,
      port: process.env.PG_LOCAL_PORT
    }
  } else {
    console.log('Unrecognized NODE_ENV: ', process.env.NODE_ENV)
  }

  try {
    const client = new Client(dbConfig)
    client.connect()
    return client
  } catch (err) {
    console.log('Error when connecting to PG with dbConfig:')
    console.log(dbConfig)
    console.log(err.message)
    return null
  }
}

const client = getClient()

function query (text) {
  return client.query(text)
}

module.exports = { query }

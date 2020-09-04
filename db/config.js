
const dbConfig = {
  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
  dev: {
    host: process.env.PG_LOCAL_HOST,
    user: process.env.PG_LOCAL_USER,
    database: process.env.PG_LOCAL_DATABASE,
    port: process.env.PG_LOCAL_PORT
  },
  test: {
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'postgres',
    port: process.env.PG_CONTAINER_PORT
  },
  script: {
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false
    }
  }
}

function getConfig () {
  // process.env.PG_CONTAINER_PORT is initially undefined
  // but it gets set in `tests/setupIntegration.js` before `getConfig` is called
  // so we need to manually set it before returning config
  if (process.env.PG_CONTAINER_PORT) {
    dbConfig.test.port = process.env.PG_CONTAINER_PORT
  }

  if (process.env.NODE_ENV in dbConfig) {
    return dbConfig[process.env.NODE_ENV]
  } else {
    console.log('Unrecognized NODE_ENV: ', process.env.NODE_ENV)
  }
}

module.exports = { getConfig }

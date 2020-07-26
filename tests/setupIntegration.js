const { GenericContainer } = require('testcontainers')
const pgm = require('node-pg-migrate')

const { getClient } = require('../db/postgres')

let pgContainer
let client
before(async function () {
  if (process.env.CI) {
    // Extend timeout for Github Action workflow
    this.timeout(30 * 1000)
  } else {
    this.timeout(10 * 1000)
  }

  console.log('-----BEGIN Integration Setup-----')

  // Load local .env file in dev environments
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(`Unexpected NODE_ENV for testing: ${process.env.NODE_ENV}`)
  }

  console.log('> Creating pgContainer...')
  pgContainer = await new GenericContainer('postgres')
    .withEnv('POSTGRES_USER', 'test')
    .withEnv('POSTGRES_PASSWORD', 'test')
    .withEnv('POSTGRES_DB', 'postgres')
    .withExposedPorts(5432)
    .start()
  process.env.PG_CONTAINER_PORT = pgContainer.getMappedPort(5432)
  console.log('> hello', pgContainer)

  client = await getClient()
  // Run migration on fresh DB
  // https://salsita.github.io/node-pg-migrate/#/api
  const migrationOptions = {
    dbClient: client,
    direction: 'up',
    dir: 'migrations'
  }
  await pgm.default(migrationOptions)

  console.log('-----END Integration Setup-----')

})

after(async function () {
  console.log('\n-----Cleaning up after the tests-----')
  try {
    const clientClosed = client.end().then(() => console.log('> Client connection closed'))
    const containerStopped = pgContainer.stop().then(() => console.log('> pgContainer stopped'))
    Promise.all([clientClosed, containerStopped]).then(() => {
      console.log('> All done!')
    })
  } catch (err) {
    console.log('> Encountered issues when attempting to clean up test state.')
    console.log('> You may need to close the pgContainer manually')
    console.log(err)
  }
})

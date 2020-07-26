const { expect } = require('chai')
const db = require('../../db')

describe('integration tests', function () {
  it('should work', () => {
    expect(true).to.equal(true)
  })

  describe('test db', function () {
    const mockName = 'testName'
    beforeEach('insert user', async function () {
      const insertUser = {
        text: 'INSERT INTO users(firstname) VALUES ($1)',
        values: [mockName]
      }
      await db.query(insertUser)
    })

    it('should contain one inserted user', async function () {
      const getUsers = {
        text: 'SELECT * from users'
      }
      const result = await db.query(getUsers)
      expect(result.rows).to.have.length(1)
      expect(result.rows[0].id).to.equal(1)
      expect(result.rows[0].firstname).to.equal(mockName)
    })
  })

  afterEach('remove users', async function () {
    const clearUsers = { text: 'DELETE FROM users' }
    await db.query(clearUsers)
  })
})

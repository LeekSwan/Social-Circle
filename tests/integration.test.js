const { expect } = require('chai')
const db = require('../db')

describe('integration tests', function () {
  it('should pass', () => {
    expect(true).to.equal(true)
  })

  describe('test db', function () {
    const mockName = 'testName'
    beforeEach('insert user', async function () {
      const insertUser = {
        text: 'INSERT INTO users(name) VALUES ($1)',
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
      expect(result.rows[0].name).to.equal(mockName)
    })
  })
})

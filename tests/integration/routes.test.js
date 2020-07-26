const request = require('supertest')
const { expect } = require('chai')
const app = require('../../app')
const { deleteAllUsers } = require('./utils')

// Helpful links for writing new route integration tests
// - https://github.com/visionmedia/supertest#example
// - https://mochajs.org/#asynchronous-code

describe('API Routes', function () {
  describe('POST /api/users', function () {
    let mockUser
    beforeEach(function () {
      mockUser = {
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
        email: 'mockEmail'
      }
    })

    afterEach(async function () {
      await deleteAllUsers()
    })

    it('should 400 when required input is missing', function (done) {
      request(app)
        .post('/api/users')
        .send({})
        .expect(400, done)
    })
    it('should 201 + return secret on success', function (done) {
      request(app)
        .post('/api/users')
        .send(mockUser)
        .expect(201)
        .then(response => {
          expect(response.body).to.have.keys(['secret'])
          done()
        }).catch(err => done(err))
    })
  })

  describe.skip('GET /api/users/:secret', function () {

  })
})

describe.skip('Non-API routes', function () {

})

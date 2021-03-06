const { expect } = require('chai')

const UserModel = require('../../models/users')
const { deleteAllUsers } = require('./utils')

describe('UserModel', function () {
  let mockFirstName, mockLastName, mockEmail, mockSecret
  let mockUserArgs
  beforeEach(function () {
    mockFirstName = 'mockFirstName'
    mockLastName = 'mockLastName'
    mockEmail = 'mockEmail'
    mockSecret = 'mockSecret'
    mockUserArgs = [mockFirstName, mockLastName, mockEmail, mockSecret]
  })

  afterEach(async function () {
    await deleteAllUsers()
  })

  describe('.create(...)', function () {
    it('should create a user with lowercased names and email', async function () {
      await UserModel.create(...mockUserArgs)
      // not ideal to create a dependency on a different function,
      // but no easy way to do this without replicating code
      const allUsers = await UserModel.getUsers()
      expect(allUsers).to.have.length(1)
      expect(allUsers[0]).to.include({
        firstname: 'mockfirstname',
        lastname: 'mocklastname',
        email: 'mockemail',
        secret: mockSecret
      })
    })

    it('should return an increasing id on consecutive calls', async function () {
      const id1 = await UserModel.create(...mockUserArgs)
      const id2 = await UserModel.create(...mockUserArgs)
      expect(id2).to.equal(id1 + 1)
    })
  })

  describe('.countEmail(...)', function () {
    let missingEmail, oneEmail, twoEmail
    let oneEmailUser, twoEmailUser
    beforeEach('setup db', async function () {
      missingEmail = 'missingEmail'
      oneEmail = 'oneEmail'
      twoEmail = 'twoEmail'
      oneEmailUser = [mockFirstName, mockLastName, oneEmail, mockSecret]
      twoEmailUser = [mockFirstName, mockLastName, twoEmail, mockSecret]

      await Promise.all([
        UserModel.create(...oneEmailUser),
        UserModel.create(...twoEmailUser),
        UserModel.create(...twoEmailUser)
      ])
    })

    it('should return 0 when no emails match', async function () {
      const count = await UserModel.countEmail(missingEmail)
      expect(count).to.equal(0)
    })

    it('should return 1 when 1 emails match', async function () {
      const count = await UserModel.countEmail(oneEmail)
      expect(count).to.equal(1)
    })

    it('should return count>1 when multiple emails match', async function () {
      const count = await UserModel.countEmail(twoEmail)
      expect(count).to.equal(2)
    })
  })
})

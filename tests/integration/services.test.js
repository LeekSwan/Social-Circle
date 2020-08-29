const { UserMergeService } = require('../../services/UserMergeService')

const { expect } = require('chai')
const { deleteAllUsers, insertUser } = require('./utils')

describe.skip('UserMergeService', function () {
  describe('.mergeAcounts(...)', function () {
    afterEach(deleteAllUsers)
    // unlinked = not child nor parent, no merges
    // unmerged account --> mergedUserId === null
    // merged (child) account --> mergedUserId !== null
    // OG (parent) account --> len(SELECT * FROM users WHERE mergedUserId === thisUserId) > 0
    it('should correctly merge for two unlinked accounts', async () => {
      let user1, user2
      // TODO: insert user1, user2 into database
      await insertUser({ userid: 1, mergeduserId: null })
      await insertUser({ userid: 2, mergeduserId: null })

      await UserMergeService.mergeAccounts(user1, user2)

      // TODO: get user1/user2 from database

      // expect user1 to be merged
      expect(user1.mergeduserid).to.equal(user2.userid)
      // expect user2 to be OG
      expect(user2.mergeduserid).to.be.null()
    })

    it('should correctly merge an OG (parent) account into another parent account', async () => {
      const ogUser1 = 1; const mergedUser1 = 11; const ogUser2 = 2; const mergedUser2 = 22
      // ogUser1 is parent of mergedUser1 --> expect(mergedUser1.mergedUserId).to.equal(ogUser1.userId)
      // ogUser2 is parent of mergedUser2 --> expect(mergedUser2.mergedUserId).to.equal(ogUser2.userId)

      await insertUser({ userid: ogUser1, mergeduserId: null })
      await insertUser({ userid: mergedUser1, mergeduserId: ogUser1 })
      await insertUser({ userid: ogUser2, mergeduserId: null })
      await insertUser({ userid: mergedUser2, mergeduserId: ogUser2 })

      await UserMergeService.mergeAccounts(ogUser1, ogUser2)

      // TODO: get from db
      const newParent = ogUser2
      const [newChild1, newChild2, newChild3] = [ogUser1, mergedUser1, mergedUser2]
      expect(newChild1.mergeduserid).to.equal(newParent.userid)
      expect(newChild2.mergeduserid).to.equal(newParent.userid)
      expect(newChild3.mergeduserid).to.equal(newParent.userid)
      expect(newParent.mergeduserid).to.be.null()
    })
    it('should throw when trying to merge a merged (child) account into any account', async () => {
      let ogUser, mergedUser, unmergedUser
      // ogUser1 is parent of mergedUser1 --> expect(mergedUser1.mergedUserId).to.equal(ogUser1.userId)
      // TODO: insert into db

      expect(async () => {
        await UserMergeService.mergeAccounts(mergedUser, unmergedUser)
      }).to.throw()

      expect(async () => {
        await UserMergeService.mergeAccounts(mergedUser, ogUser)
      }).to.throw()
    })
    it('should throw when trying to merge any account into a merged (child) account', async () => {
      // this should never happen btw

      let ogUser, mergedUser, unmergedUser
      // ogUser1 is parent of mergedUser1 --> expect(mergedUser1.mergedUserId).to.equal(ogUser1.userId)
      // TODO: insert into db

      expect(async () => {
        await UserMergeService.mergeAccounts(ogUser, mergedUser)
      }).to.throw()

      expect(async () => {
        await UserMergeService.mergeAccounts(unmergedUser, mergedUser)
      }).to.throw()
    })
  })
})

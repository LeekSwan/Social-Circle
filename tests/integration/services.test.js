const { UserMergeService } = require('../../services/UserMergeService')
const UserService = require('../../services/users')

const { expect } = require('chai')
const { deleteAllUsers, insertUser, getUser, addFriend } = require('./utils')

describe.skip('UserMergeService', function () {
  describe('.mergeAcounts(...)', function () {
    afterEach(deleteAllUsers)
    // unlinked = not child nor parent, no merges
    // unmerged account --> mergedUserId === null
    // merged (child) account --> mergedUserId !== null
    // OG (parent) account --> len(SELECT * FROM users WHERE mergedUserId === thisUserId) > 0
    it('should correctly merge for two unlinked accounts', async () => {
      const userId1 = 1
      const userId2 = 2

      await insertUser({ userid: userId1, mergeduserId: null })
      await insertUser({ userid: userId2, mergeduserId: null })

      await UserMergeService.mergeAccounts(userId1, userId2)

      const user1 = getUser(userId1)
      const user2 = getUser(userId2)

      // expect user1 to be merged
      expect(user1.mergeduserid).to.equal(user2.userid)
      // expect user2 to be OG
      expect(user2.mergeduserid).to.be.null()
    })

    it('should correctly merge an OG (parent) account into another parent account', async () => {
      const ogUser1 = 1
      const mergedUser1 = 11
      const ogUser2 = 2
      const mergedUser2 = 22
      // ogUser1 is parent of mergedUser1 --> expect(mergedUser1.mergedUserId).to.equal(ogUser1.userId)
      // ogUser2 is parent of mergedUser2 --> expect(mergedUser2.mergedUserId).to.equal(ogUser2.userId)

      await insertUser({ userid: ogUser1, mergeduserId: null })
      await insertUser({ userid: mergedUser1, mergeduserId: ogUser1 })
      await insertUser({ userid: ogUser2, mergeduserId: null })
      await insertUser({ userid: mergedUser2, mergeduserId: ogUser2 })

      await UserMergeService.mergeAccounts(ogUser1, ogUser2)

      const newParent = getUser(ogUser2)
      const newChild1 = getUser(ogUser1)
      const newChild2 = getUser(mergedUser1)
      const newChild3 = getUser(mergedUser2)
      expect(newChild1.mergeduserid).to.equal(newParent.userid)
      expect(newChild2.mergeduserid).to.equal(newParent.userid)
      expect(newChild3.mergeduserid).to.equal(newParent.userid)
      expect(newParent.mergeduserid).to.be.null()
    })
    it('should correctly merge friends of an OG (parent) account into another parent account', async () => {
      const ogUser1 = 1
      const ogUser2 = 2
      const friend1 = 11
      // ogUser1 is being merged to ogUser2. friend1 is origionally a friend of ogUser1.

      await insertUser({ userid: ogUser1, mergeduserId: null })
      await insertUser({ userid: ogUser2, mergeduserId: null })
      await insertUser({ userid: friend1, mergeduserId: null })

      await addFriend(ogUser1, friend1)
      await UserMergeService.mergeAccounts(ogUser1, ogUser2)

      const newParentFriendship = UserService.login(ogUser2)
      const newChildFriendship = UserService.login(ogUser1)

      expect(newParentFriendship.data.friendList[0].friendId).to.be.equal(friend1)
      expect(newChildFriendship.data.friendList[0].friendId).to.be.equal(friend1)
    })
    it('should throw when trying to merge a merged (child) account into any account', async () => {
      const ogUserId = 1
      const mergedUserId = 2
      const unmergedUserId = 3
      // ogUser is parent of mergedUser --> expect(mergedUser.mergedUserId).to.equal(ogUser.userId)

      await insertUser({ userid: ogUserId, mergeduserId: null })
      await insertUser({ userid: mergedUserId, mergeduserId: ogUserId })
      await insertUser({ userid: unmergedUserId, mergeduserId: null })

      expect(async () => {
        await UserMergeService.mergeAccounts(mergedUserId, unmergedUserId)
      }).to.throw()

      expect(async () => {
        await UserMergeService.mergeAccounts(mergedUserId, ogUserId)
      }).to.throw()
    })
    it('should throw when trying to merge any account into a merged (child) account', async () => {
      // this should never happen btw

      const ogUserId = 1
      const mergedUserId = 2
      const unmergedUserId = 3
      // ogUser1 is parent of mergedUser1 --> expect(mergedUser1.mergedUserId).to.equal(ogUser1.userId)

      await insertUser({ userid: ogUserId, mergeduserId: null })
      await insertUser({ userid: mergedUserId, mergeduserId: ogUserId })
      await insertUser({ userid: unmergedUserId, mergeduserId: null })

      expect(async () => {
        await UserMergeService.mergeAccounts(ogUserId, mergedUserId)
      }).to.throw()

      expect(async () => {
        await UserMergeService.mergeAccounts(unmergedUserId, mergedUserId)
      }).to.throw()
    })
  })
})

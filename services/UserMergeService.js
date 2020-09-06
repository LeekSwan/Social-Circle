const UserModel = require('../models/users')
const UserService = require('./users')
const errorTable = require('../routes/constants')

async function mergeAccounts (mergeSecret, secret) {
  const userIds = await UserService.getUserIdsFromSecrets([mergeSecret, secret])
  // mergeSecret = account being merged and will become child of og account
  // secret = og account that is being merged to and will become parent of merged account and all its childs

  // Checks for existing account
  if (userIds[mergeSecret] === null || userIds[secret] === null) {
    throw new Error(errorTable.NONEXISTENT_USER)
  }
  // Checks if account has already been merged. If is not null, throw "This account has already been merged" error
  const mergeIsMerged = await UserModel.getMergedUserId(userIds[mergeSecret])
  const ogIsMerged = await UserModel.getMergedUserId(userIds[secret])
  if (mergeIsMerged || ogIsMerged) {
    throw new Error(errorTable.ACCOUNT_HAS_BEEN_MERGED)
  }

  await Promise.all([
    // Change mergeduserid field of account being merged to be ogUserId
    // Change all mergeduserid field of child accounts that pointed to mergeUserId to point to ogUserId
    UserModel.mergeAccounts(userIds[mergeSecret], userIds[secret]),
    UserModel.mergeChildAccounts(userIds[mergeSecret], userIds[secret]),

    // Change all friendships that points to mergeUserId to ogUserId
    UserModel.mergeFriends(userIds[mergeSecret], userIds[secret])
  ])
  // Remove duplicate friendships after merge
  return UserModel.removeDuplicateFriends(userIds[secret])
}

module.exports = {
  mergeAccounts
}

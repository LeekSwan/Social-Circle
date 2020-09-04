const UserModel = require('../models/users')
const errorTable = require('../routes/constants')

async function mergeAccounts (mergeUserId, ogUserId) {
  // mergeUserId = account being merged and will become child of og account
  // orUserId = account that is being merged to and will become parent of merged account and all its childs

  // Checks if account has already been merged. If is not null, throw "This account has already been merged" error
  const mergeIsMerged = await UserModel.getMergedUserId(mergeUserId)
  const ogIsMerged = await UserModel.getMergedUserId(ogUserId)
  if (mergeIsMerged || ogIsMerged) {
    throw new Error(errorTable.ACCOUNT_HAS_BEEN_MERGED())
  }

  return Promise.all([
    // Change mergeduserid field of account being merged to be ogUserId
    // Change all mergeduserid field of child accounts that pointed to mergeUserId to point to ogUserId
    UserModel.mergeAccounts(mergeUserId, ogUserId),
    UserModel.mergeChildAccounts(mergeUserId, ogUserId),

    // Change all friendships that points to mergeUserId to ogUserId
    UserModel.mergeFriends(mergeUserId, ogUserId),

    // Remove duplicate friendships after merge
    UserModel.removeDuplicateFriends(ogUserId)
  ])
}

module.exports = {
  mergeAccounts
}

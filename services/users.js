const UserModel = require('../models/users')
const MailService = require('../services/mail')

const { v4: uuidv4 } = require('uuid')

// Helper function
async function checkEmailAlreadyRegistered (email) {
  const count = await UserModel.countEmail(email)
  return (count > 0)
}

async function signup (firstName, lastName, email) {
  const emailRegistered = await checkEmailAlreadyRegistered(email)
  if (emailRegistered) {
    throw new Error('emailRegistered')
  }
  const secret = uuidv4()
  await UserModel.create(firstName, lastName, email, secret)
  MailService.sendNewUserEmail({ firstName, lastName, email, secret })
  return secret
}

async function login (secret) {
  const userData = await UserModel.getUserBySecret(secret)
  if (userData == null) {
    throw new Error('invalidSecret')
  }
  return userData
}

// TODO: refactor this so it makes more sense
async function addFriend (userId, firstName, lastName, friendFName, friendLName, friendEmail) {
  // Get userId of friend
  let friendId
  const userExists = await checkEmailAlreadyRegistered(friendEmail)
  if (userExists) {
    friendId = await UserModel.getUserIdByEmail(friendEmail)
  } else {
    const secret = uuidv4()
    friendId = await UserModel.create(friendFName, friendLName, friendEmail, secret)
    // TODO: get friend first/last name from db instead of passing values
    MailService.sendNewFriendEmail({ firstName, lastName, friendFName, friendLName, friendEmail, secret })
  }

  // Add friend
  if (userExists) {
    const friendshipExists = await UserModel.checkFriendshipExists(userId, friendEmail)
    if (friendshipExists) {
      throw new Error('friendshipExists')
    }
  }
  return UserModel.addFriend(userId, friendId)
}

// Returns a Set containing userIds for every friend in their social circle
async function getSocialCircle (secret) {
  const userId = await UserModel.getUserIdBySecret(secret)

  // -- Create Set of all friends in the social circle
  let queue = [userId]
  const seen = new Set()
  seen.add(userId)

  let newQueue = []
  while (queue.length > 0) {
    // reset new queue
    newQueue = []

    // Run through the queue in parallel
    //   For a given user:
    //   1. Get all friends of that users
    //   2. Add any "unseen" friends to "seen" and new queue
    // Await them all at the end
    const promises = queue.map(async user => {
      const friends = await UserModel.getFriendsById(user)
      friends.forEach(friend => {
        if (!seen.has(friend)) {
          newQueue.push(friend)
          seen.add(friend)
        }
      })
    })
    await Promise.all(promises)

    // replace processed queue with new queue
    queue = newQueue
  }

  // Don't include original user in the network
  seen.delete(userId)
  return seen
}

async function deleteUserAndFriends (secret) {
  return UserModel.deleteUserAndFriendships(secret)
}

async function removeFriend (userId, friendId, secret) {
  const isAuthenticated = await UserModel.authenticateUser(userId, secret)
  if (isAuthenticated) {
    return UserModel.removeFriendship(userId, friendId)
  }
}

async function getUserIdsFromSecrets (secrets) {
  return Promise.all(Object.keys(secrets).map(key => UserModel.getUserIdBySecret(secrets[key])))
    .then((values) => {
      const userIds = {}
      secrets.forEach((secret, i) => { userIds[secret] = values[i] })
      return userIds
    })
}

async function getUserEmailBySecret (secret) {
  return UserModel.getUserEmailBySecret(secret)
}

async function testDB () {
  return UserModel.getUsers()
}

async function authenticateUser (userId, secret) {
  return UserModel.authenticateUser(userId, secret)
}

module.exports = {
  signup,
  login,
  addFriend,
  getSocialCircle,
  deleteUserAndFriends,
  removeFriend,
  getUserIdsFromSecrets,
  getUserEmailBySecret,
  testDB,
  authenticateUser
}

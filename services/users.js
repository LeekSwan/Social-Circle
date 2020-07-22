const UserModel = require('../models/users')

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
  UserModel.create(firstName, lastName, email, secret)
  // TODO: send email on signup
  return secret
}

async function login (secret) {
  // TODO: throw error when secret is unrecognized
  return UserModel.getUserBySecret(secret)
}

// TODO: refactor this so it makes more sense
async function addFriend (userId, friendFName, friendLName, friendEmail) {
  // Get userId of friend
  let friendId
  const userExists = await checkEmailAlreadyRegistered(friendEmail)
  if (userExists) {
    friendId = await UserModel.getUserIdByEmail(friendEmail)
  } else {
    const secret = uuidv4()
    const { friendId } = await UserModel.create(friendFName, friendLName, friendEmail, secret)
    // TODO: send invitation email
    return friendId
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

async function testDB () {
  return UserModel.getUsers()
}

module.exports = {
  signup,
  login,
  addFriend,
  getSocialCircle,
  testDB
}

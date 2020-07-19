const UserModel = require('../models/users')

const { v4: uuidv4 } = require('uuid')

async function checkEmailAlreadyRegistered(email) {
  const count = await UserModel.countEmail(email)
  return (count > 0)
}

async function signup(firstName, lastName, email) {
  const secret = uuidv4()
  UserModel.create(firstName, lastName, email, secret)
  // TODO: send email on signup
  return secret
}

async function login(secret) {
  // TODO: throw error when secret is unrecognized
  return UserModel.getUserBySecret(secret)
}

// TODO: refactor this so it makes more sense
async function addFriend(userId, friendFName, friendLName, friendEmail) {
  // Get userId of friend
  let friendId
  const userExists = await this.checkEmailAlreadyRegistered(friendEmail)
  if (userExists) {
    friendId = await UserModel.getUserIdByEmail(friendEmail)
  } else {
    const secret = uuidv4()
    let { friendId } = await UserModel.create(friendFName, friendLName, friendEmail, secret)
    // TODO: send invitation email
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

async function test() {
  return UserModel.getUsers()
}

module.exports = {
  checkEmailAlreadyRegistered,
  signup,
  login,
  addFriend,
  test
}

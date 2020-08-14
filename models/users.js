const db = require('../db')

module.exports = {

  // Adds user to users db
  // Returns ID of created user
  create: async function (firstname, lastname, email, secret) {
    const insertUser = {
      text: 'INSERT INTO users(firstname, lastname, email, secret) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [firstname.toLowerCase(), lastname.toLowerCase(), email.toLowerCase(), secret]
    }
    const result = await db.query(insertUser)
    return result.rows[0].id
  },

  // Checks for duplicate users with same email
  // Goes through database and counts where email matches. Returns true if user is alreayd registered
  countEmail: async function (email) {
    const checkdup = {
      text: 'SELECT COUNT(email) FROM users WHERE email = $1',
      values: [email.toLowerCase()]
    }
    const result = await db.query(checkdup)
    return parseInt(result.rows[0].count)
  },

  // Get user data from secret
  // TODO: separate this function into 2 different functions
  // - getUserBySecret
  // - getFriendsById
  getUserBySecret: async function (secret) {
    const getUserData = {
      text: 'SELECT users.id, users.firstname, users.lastname, f.user2 AS friendId, u.firstname AS friendfname, u.lastname As friendlname ' +
      'FROM users ' +
      'LEFT JOIN friendships AS f ON  f.user1 = users.id ' +
      'LEFT JOIN users as u ON f.user2 = u.id WHERE users.secret = $1',
      values: [secret]
    }
    const res = await db.query(getUserData)
    const friends = res.rows
    const capitalized = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }

    // Checks if query returned data. If not, then user secret is not valid
    if (friends.length === 0) {
      console.log('got to models')
      return {
        id: null
      }
    }

    // populate friendsList
    const flist = []
    if (friends[0].friendfname == null) {
      flist.push({})
    } else {
      for (let i = 0; i < friends.length; i++) {
        flist.push({
          friendId: friends[i].friendid,
          firstName: capitalized(friends[i].friendfname),
          lastName: capitalized(friends[i].friendlname)
        })
      }
    }

    return {
      id: friends[0].id,
      firstName: capitalized(friends[0].firstname),
      lastName: capitalized(friends[0].lastname),
      friendList: flist
    }
  },

  // Get user id from email
  getUserIdByEmail: async function (email) {
    const getUserId = {
      text: 'SELECT id FROM users WHERE users.email = $1',
      values: [email]
    }
    // TODO: Return null if doesn't exist
    const result = await db.query(getUserId)
    return result.rows[0].id
  },

  getUserIdBySecret: async function (secret) {
    const getUserId = {
      text: 'SELECT id FROM users WHERE users.secret = $1',
      values: [secret]
    }
    // TODO: Return null if doesn't exist
    const result = await db.query(getUserId)
    return result.rows[0].id
  },

  // Goes through and see if there are any db entries that match the user and email.
  // If matched, length of rows != 0. There is an existing friendship and returns true
  checkFriendshipExists: async function (userid, friendemail) {
    const checkFriendship = {
      text: 'SELECT user1, u1.firstname, u1.email, user2, u2.firstname, u2.email FROM friendships ' +
      'LEFT JOIN users as u1 ON  friendships.user1 = u1.id ' +
      'LEFT JOIN users as u2 ON friendships.user2 = u2.id WHERE user1 = $1 AND u2.email = $2',
      values: [userid, friendemail]
    }
    const result = await db.query(checkFriendship)
    return (result.rows.length !== 0)
  },

  // Helper function for /api/friendships to add friends to friendships db
  addFriend: async function (user1, user2) {
    const addFriendship = {
      text: 'INSERT INTO friendships(user1, user2) VALUES ($1, $2) RETURNING user2 AS friendId',
      values: [user1, user2]
    }
    return db.query(addFriendship)
  },

  // delete user account and all existing friendships
  deleteUserAndFriendships: async function (userSecret) {
    const deleteUserAndFriendships = {
      text: 'DELETE FROM users WHERE secret = $1',
      values: [userSecret]
    }
    return db.query(deleteUserAndFriendships)
  },

  // removes specific friendship from users friendships
  removeFriendship: function (userId, friendId) {
    const deleteFriendship = {
      text: 'DELETE FROM friendships WHERE user1 = $1 AND user2 = $2',
      values: [userId, friendId]
    }
    return db.query(deleteFriendship)
  },

  getUsers: function () {
    const query = 'Select * from users'
    return db.query(query).then(result => result.rows)
  },

  getFriendsById: async function (userId) {
    // query the DB
    const getFriends = {
      text: 'SELECT user2 FROM friendships WHERE user1 = $1',
      values: [userId]
    }
    const res = await db.query(getFriends)
    // transform res.rows
    // FROM:  [ { user2: 123}, { user2: 456}, ... ]
    // TO:    [ 123, 456 ]
    return res.rows.map(row => row.user2)
  },

  // Autheticates user by checking secret and userId. Returns true if both values are returned by query.
  authenticateUser: async function (userId, secret) {
    const auth = {
      text: 'SELECT id FROM users WHERE id = $1 AND secret = $2',
      values: [userId, secret]
    }
    const res = await db.query(auth)
    return (res.rows.length !== 0)
  }
}

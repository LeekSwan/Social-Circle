const db = require('../db')
module.exports = {

  // Adds user to users db
  addUser: async function (firstname, lastname, email, secret) {
    const insertUser = {
      text: 'INSERT INTO users(firstname, lastname, email, secret) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [firstname.toLowerCase(), lastname.toLowerCase(), email.toLowerCase(), secret]
    }
    return db.query(insertUser)
  },

  // Checks for duplicate users with same email
  // Goes through database and counts where email matches. Returns true if user is alreayd registered
  emailAlreadyRegistered: async function (email) {
    const checkdup = {
      text: 'SELECT COUNT(email) FROM users WHERE email = $1',
      values: [email.toLowerCase()]
    }
    const result = await db.query(checkdup)
    return (result.rows[0].count > 0)
  },

  // Get user data from secret
  getUserBySecret: async function (secret) {
    const getUserData = {
      text: 'SELECT users.id, users.firstname, users.lastname, u.firstname AS friendfname, u.lastname As friendlname ' +
      'FROM users ' +
      'LEFT JOIN friendships AS f ON  f.user1 = users.id ' +
      'LEFT JOIN users as u ON f.user2 = u.id WHERE users.secret = $1',
      values: [secret]
    }
    return db.query(getUserData)
  },

  // Get user id from email
  getUserIdByEmail: async function (friendemail) {
    const getFriendId = {
      text: 'SELECT id FROM users WHERE users.email = $1',
      values: [friendemail]
    }
    return db.query(getFriendId)
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
      text: 'INSERT INTO friendships(user1, user2) VALUES ($1, $2)',
      values: [user1, user2]
    }
    return db.query(addFriendship)
  },

  // delete user account and all existing friendships
  deleteUserAndFriendships: async function (userSecret) {
		const deleteUserAndFriendships = {
			text: 'DELETE FROM users USING users as u ' +
			'LEFT JOIN friendships AS f ON  f.user1 = u.id ' +
			'LEFT JOIN users as u1 ON f.user2 = u.id WHERE users.secret = $1',
			values: {userSecret}
		}
		return dq.query(deleteUserAndFriendships)
  },

  // removes specific friendship from users friendships
  removeFriendship: function (userId, friendId) {
		const deleteFriendship = {
			text: 'DELETE FROM friendships WHERE user1 = $1 AND user2 = $2',
			values: {userId, friendId}
		}
		return db.query(deleteFriendship)
  }

}

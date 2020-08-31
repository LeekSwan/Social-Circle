const db = require('../../db')

async function deleteAllUsers () {
  const deleteAllUsers = { text: 'DELETE FROM users' }
  await db.query(deleteAllUsers)
}

function insertUser (values) {
  // values = { firstname: 'name', userid: 'id', }
  const orderedKeysList = Object.keys(values).map(e => (typeof e) === 'string' ? e.toLowerCase() : e)

  const keyString = orderedKeysList.join(', ')
  const orderedValuesList = orderedKeysList.map(k => values[k])

  const insertUser = {
    text: `INSERT INTO users(${keyString}) VALUES ($1)`,
    values: orderedValuesList

  }
  return db.query(insertUser)
}

async function getUser (userId) {
  const getUser = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [userId]

  }
  const user = await db.query(getUser)
  return user.rows[0]
}

function addFriend (user1, user2) {
  const addFriendship = {
    text: 'INSERT INTO friendships(user1, user2) VALUES ($1, $2)',
    values: [user1, user2]
  }
  return db.query(addFriendship)
}

async function checkFriendshipExists (user1, user2) {
  const checkFriendship = {
    text: 'SELECT * FROM friendships where user1 = $1 AND user2 = $2',
    values: [user1, user2]
  }
  const result = await db.query(checkFriendship)
  return (result.rows.length !== 0)
}

module.exports = {
  deleteAllUsers,
  insertUser,
  getUser,
  addFriend,
  checkFriendshipExists
}

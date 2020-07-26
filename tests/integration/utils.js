const db = require('../../db')

async function deleteAllUsers () {
  const deleteAllUsers = { text: 'DELETE FROM users' }
  await db.query(deleteAllUsers)
}

module.exports = {
  deleteAllUsers
}

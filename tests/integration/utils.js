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

module.exports = {
  deleteAllUsers,
  insertUser
}

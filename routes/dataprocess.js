
module.exports = {
  // Helper function for /api/user/:secret
  // Takes in res data and formats it to user first name, user last name, friends list
  formatUserData: function (res) {
    const userData = {}
    const friends = res.rows
    const flist = []
    if (friends[0].friendfname == null) {
      flist[0] = 'You currently have no friends'
    } else {
      for (let i = 0; i < friends.length; i++) {
        const fname = friends[i].friendfname.charAt(0).toUpperCase() + friends[i].friendfname.slice(1)
        const lname = friends[i].friendlname.charAt(0).toUpperCase() + friends[i].friendlname.slice(1)
        flist[i] = fname + ' ' + lname
      }
    }
    userData.id = friends[0].id
    userData.firstname = friends[0].firstname.charAt(0).toUpperCase() + friends[0].firstname.slice(1)
    userData.lastname = friends[0].lastname.charAt(0).toUpperCase() + friends[0].lastname.slice(1)
    userData.friendslist = flist
    return userData
  }
}

import React from 'react'
import axios from 'axios'
import UserNotFound from './UserNotFound'
import AddFriend from './AddFriend'
import { validate } from 'uuid'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      firstName: '',
      lastName: '',
      friendList: []
    }
  }
  
  componentDidMount () {
    axios.get(`/api${this.props.location.pathname}`)
      .then(res => {
        this.setState({
          userId: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          friendList: res.data.friendList
        })
      }).catch(err => {
        console.log(err)
      })
    }

  render () {
    return (
      <div>
        {validateSecret(this.state.userId) ? (<AddFriend state={this.state} />) : ( <UserNotFound location={this.props.location} />)}
      </div>
    )
  }
}

function validateSecret(userId) {
  if (userId === null) {
    return false
  }
  return true
}

export default Parent

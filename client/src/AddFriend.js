import React from 'react'
import axios from 'axios'

class AddFriend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      friendships: [],
      newFriend: {
        friendfirstname: 'Friends first name',
        friendlastname: 'Friends last name',
        friendemail: 'Friends email'
      }

    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    axios.get(`/api${this.props.location.pathname}`)
      .then(res => {
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          friendships: res.data.friendslist
        })
      })
  }

  handleAdd (e) {
    // check for empty inputs
    // Add new user to users table
    // Add friend relationship to friendships table

    if (!this.state.firstname || !this.state.lastname || !this.state.email) {
      return window.alert('Input field empty')
    }
    axios.post('/api/friendships', this.state)
      .then(res => {

      })
    e.preventDefault()
  }

  handleChange (e) {
    // handles changes to add friend inputs
  }

  render () {
    return (
      <div>
        <h2>Social Circle</h2>
        <h5>Hi {this.state.firstname} {this.state.lastname}! Add your friends below.</h5>

        <ul>
          {this.state.friendships.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <form onSubmit={this.handleAdd}>
          <input
            type='text'
            name='friendfirstname'
            value={this.state.friendfirstname}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='friendlastname'
            value={this.state.friendlastname}
            onChange={this.handleChange}
          />
          <input
            type='email'
            name='friendemail'
            value={this.state.friendemail}
            onChange={this.handleChange}
          />
          <input type='submit' value='Add Friend' />
        </form>

        <h5>Total Count</h5>
        <h5>0</h5>
      </div>
    )
  }
}

export default AddFriend

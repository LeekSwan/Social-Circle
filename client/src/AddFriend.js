import React from 'react'
import axios from 'axios'

class AddFriend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userid: 0,
      firstname: '',
      lastname: '',
      friendships: [],
      friendfname: '',
      friendlname: '',
      friendemail: ''
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    axios.get(`/api${this.props.location.pathname}`)
      .then(res => {
        this.setState({
          userid: res.data.id,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          friendships: res.data.friendslist
        })
      })
  }

  handleAdd (e) {
    // check for empty inputs

    if (!this.state.friendfname || !this.state.friendlname || !this.state.friendemail) {
      return window.alert('Input field empty')
    }
    axios.post('/api/friendships', this.state)

      .then(res => {
        if (res.status >= 200) {
          window.alert('You are now friends with ' + this.state.friendfname + ' ' + this.state.friendlname)
          this.setState(state => {
            const friendships = state.friendships.concat(state.friendfname + ' ' + state.friendlname)
            return { friendships }
          })
        }
      })
      .catch(err => {
        if (err.response.status === 409) {
          window.alert('You are already friends with this person')
        }
      })
    e.preventDefault()
    e.target.reset()
  }

  handleChange (e) {
    // handles changes to add friend inputs
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div>
        <h2>Social Circle</h2>
        <h5>Hi ***{this.state.userid}*** {this.state.firstname} {this.state.lastname}! Add your friends below.</h5>

        <ul>
          {this.state.friendships.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <form onSubmit={this.handleAdd}>
          <input
            type='text'
            name='friendfname'
            onChange={this.handleChange}
            placeholder='Friends first name'
          />
          <input
            type='text'
            name='friendlname'
            onChange={this.handleChange}
            placeholder='Friends last name'
          />
          <input
            type='email'
            name='friendemail'
            onChange={this.handleChange}
            placeholder='Friends email'
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

import React from 'react'
import axios from 'axios'
import { Button, Spinner, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class AddFriend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: 0,
      firstName: '',
      lastName: '',
      friendShips: [],
      friendFName: '',
      friendLName: '',
      friendEmail: '',
      isLoading: false,
      status: 0
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    axios.get(`/api${this.props.location.pathname}`)
      .then(res => {
        this.setState({
          userId: res.data.id,
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          friendShips: res.data.friendslist
        })
      })
  }

  handleAdd (e) {
    // check for empty inputs
    this.setState({ isLoading: true })
    if (!this.state.friendFName || !this.state.friendLName || !this.state.friendEmail) {
      return window.alert('Input field empty')
    }
    axios.post('/api/friendShips', this.state)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          // window.alert('You are now friends with ' + this.state.friendFName + ' ' + this.state.friendLName)
          this.setState(state => {
            const friendShips = state.friendShips.concat(state.friendFName + ' ' + state.friendLName)
            const status = 201
            return { friendShips, status }
          })
        }
        this.setState({ isLoading: false })
      })
      .catch(err => {
        if (err.response.status === 409) {
          // window.alert('You are already friends with this person')
          this.setState({ status: 409 })
        }
        this.setState({ isLoading: false })
      })
    e.preventDefault()
    e.target.reset()
  }

  handleDelete (e) {
    axios.delete('/api/delete', this.state)
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
        <h5>Hi ***{this.state.userId}*** {this.state.firstName} {this.state.lastName}! Add your friends below.</h5>

        <ul>
          {this.state.friendShips.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <form onSubmit={this.handleAdd}>
          <input
            type='text'
            name='friendFName'
            onChange={this.handleChange}
            placeholder='Friends first name'
          />
          <input
            type='text'
            name='friendLName'
            onChange={this.handleChange}
            placeholder='Friends last name'
          />
          <input
            type='email'
            name='friendEmail'
            onChange={this.handleChange}
            placeholder='Friends email'
          />
        { this.state.isLoading ?  loadButton() : submitButton() }
        </form>

        <div>
          {displayAlert(this.state.status)}
        </div>
        

        <h5>Total Count</h5>
        <h5>0</h5>
      </div>
    )
  }
}

function loadButton () {
  return (
    <>
      <Button variant='secondary' disabled>
        <Spinner
          as='span'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
        />
    Loading...
      </Button>
    </>


  )
}
function submitButton () {
  return (
    <input type='submit' value='Add Friend' />
  )
}

function displayAlert (status) {
  if (status === 409) {
    return (
      <Alert variant='danger'>
      This is a danger alert—check it out!
      </Alert>
    )
  } else if (status === 201) {
    return (
      <Alert variant='success'>
      This is a danger alert—check it out!
      </Alert>
    )

  }
}

export default AddFriend

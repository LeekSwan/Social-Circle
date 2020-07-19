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
      friendships: [],
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
          friendships: res.data.friendslist
        })
      })
  }

  handleAdd (e) {
    // check for empty inputs
    this.setState({ isLoading: true })
    if (!this.state.friendFName || !this.state.friendLName || !this.state.friendEmail) {
      return this.setState({ status: 406 })
    }
    axios.post('/api/friendships', this.state)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          this.setState(state => {
            const friendships = state.friendships.concat(state.friendFName + ' ' + state.friendLName)
            const status = 201
            return { friendships, status }
          })
        }
        this.setState({ isLoading: false })
      })
      .catch(err => {
        if (err.response.status === 409) {
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
          {this.state.friendships.map(item => (
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
          {this.state.isLoading ? loadButton() : submitButton()}
        </form>

        <div>
          {displayAlert(this.state)}
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

// // Helper function to set alert timer
// function alertTimer (status) {
//   this.setState({status: status},()=>{
//     window.setTimeout(()=>{
//       this.setState({status: status})
//     },2000)
//   });
// }

// TODO: Set a 2 second timer to display alert before it disapears
function displayAlert (state) {
  if (state.status === 409) {
    return (
      <Alert variant='danger'>
      You are already friends with this person.
      </Alert>
    )
  } else if (state.status === 406) {
    return (
      <Alert variant='warning'>
      Please fill all fields.
      </Alert>
    )
  } else if (state.status === 201) {
    return (
      <Alert variant='success'>
      You are now friends with {state.friendFName} {state.friendLName}
      </Alert>
    )
  }
}

export default AddFriend

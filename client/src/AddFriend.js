import React from 'react'
import axios from 'axios'
import { Button, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import CountDisplay from './CountDisplay'
import DeleteButton from './DeleteButton'
import FormAlert from './FormAlert'
import { alertTable } from './constants'

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
      alertType: ''
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  componentDidMount () {
    axios.get(`/api${this.props.location.pathname}`)
      .then(res => {
        console.log(res)
        this.setState({
          userId: res.data.id,
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          friendships: res.data.friendslist
        })
      }).catch(err => {
        console.log(err)
      })
  }

  // TODO: prevent page reload on empty input
  handleAdd (e) {
    // check for empty inputs
    this.setState({ isLoading: true })
    if (!this.state.friendFName || !this.state.friendLName || !this.state.friendEmail) {
      return this.setState({ alertType: alertTable.EMPTY_FIELD })
    }
    axios.post('/api/friendships', this.state)
      .then(res => {
        console.log('got to axios.post')
        if (res.status >= 200 && res.status < 300) {
          this.setState({
            friendships: this.state.friendships.concat(this.state.friendFName + ' ' + this.state.friendLName),
            alertType: alertTable.CREATED
          })
          // This seems to be clearning the friend name before alert can pass the data into alert component.
          this.resetForm()
        }

        // This seems to be clearing the friend name before alert can pass the data into alert component.
        this.setState({ isLoading: false, friendFName: '', friendLName: '', friendEmail: '' })
      })
      .catch(err => {
        if (err.response.status === 409) {
          this.setState({ alertType: alertTable.FRIEND_EXISTS, isLoading: false })
          this.resetForm()
        }
        console.log(err)
      })
    e.preventDefault()
    e.target.reset()
  }

  resetForm () { this.setState({ friendFName: '', friendLName: '', friendEmail: '' }) }

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

        <FormAlert alertType={this.state.alertType} firstName={this.state.friendFName} lastName={this.state.friendFName} />

        <CountDisplay location={this.props.location} />

        <DeleteButton location={this.props.location} history={this.props.history} />

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

export default AddFriend

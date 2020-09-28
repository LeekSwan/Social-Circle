import React from 'react'
import axios from 'axios'
import { Button, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import CountDisplay from './CountDisplay'
import Settings from './Settings'
import RemoveFriendButton from './RemoveFriendButton'
import FormAlert from './FormAlert'
import { alertTable } from '../constants'

class AddFriend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      componentDidMount: false,
      userId: 0,
      firstName: '',
      lastName: '',
      friendList: [],
      friendFName: '',
      friendLName: '',
      friendEmail: '',
      isLoading: false,
      alertType: ''
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleFriendRemoval = this.handleFriendRemoval.bind(this)
  }

  componentDidMount () {
    axios.get(`/api${this.props.location.pathname}`)
      .then(res => {
        console.log(res)
        this.setState({
          userId: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          friendList: res.data.friendList
        })
        this.setState({ componentDidMount: true })
      }).catch(err => {
        if (err.response.status === 404) {
          this.props.history.push({ pathname: '/404' })
        } else if (err.response.status === 500) {
          this.props.history.push({ pathname: '/500' })
        }
        console.log(err)
      })
  }

  async handleAdd (e) {
    e.preventDefault()
    e.persist()
    this.setState({ isLoading: true })

    // check for empty inputs
    if (!this.state.friendFName || !this.state.friendLName || !this.state.friendEmail) {
      this.resetForm(e)
      return this.setState({ isLoading: false, alertType: alertTable.EMPTY_FIELD })
    }

    try {
      const res = await axios.post(`/api${this.props.location.pathname}/friendships`, this.state)
      this.state.friendList.push({
        friendId: res.data.rows[0].friendid,
        firstName: this.state.friendFName,
        lastName: this.state.friendLName
      })
      this.setState({
        friendships: this.state.friendList,
        alertType: alertTable.CREATED
      })
      this.resetForm(e)
    } catch (err) {
      console.log(err)
      if (err.response.status === 409) {
        this.setState({ alertType: alertTable.FRIEND_EXISTS })
      }
    }

    this.setState({ isLoading: false })
  }

  resetForm (e) {
    e.target.reset()
    this.setState({ friendFName: '', friendLName: '', friendEmail: '' })
  }

  renderFriendList (flist) {
    if (flist.length >= 1) {
      return (
        flist.map((item) => (
          <li key={item.friendId}>
            <span>{item.firstName} {item.lastName} {item.friendId}</span>
            <RemoveFriendButton friendId={item.friendId} userId={this.state.userId} location={this.props.location} onHandleFriendRemoval={this.handleFriendRemoval} />
          </li>
        ))
      )
    } else {
      return (
        'You have no friends bruv'
      )
    }
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

  // This is passed as a prop to remove friend button to update friendlist on removal.
  handleFriendRemoval (friendId) {
    const newList = this.state.friendList.filter((item) => item.friendId !== friendId)
    this.setState({ friendList: newList })
  }

  render () {
    if (!this.state.componentDidMount) {
      return (
        <div className='spinner-container'>
          <Spinner
            variant='primary'
            as='span'
            animation='border'
            role='status'
            aria-hidden='true'
          />
        </div>
      )
    }
    return (
      <div>
        <h2>Social Circle</h2>
        <h5>Hi ***{this.state.userId}*** {this.state.firstName} {this.state.lastName}! Add your friends below.</h5>

        <ul>
          {this.renderFriendList(this.state.friendList)}
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

        <FormAlert alertType={this.state.alertType} firstName={this.state.friendFName} lastName={this.state.friendLName} />

        <CountDisplay location={this.props.location} />

        <Settings location={this.props.location} history={this.props.history} />

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

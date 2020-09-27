import React from 'react'
import axios from 'axios'

import SignupAlert from './SignupAlert'
import { alertTable } from '../constants'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      alertType: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    if (!this.state.firstName || !this.state.lastName || !this.state.email) {
      return this.setState({ alertType: alertTable.EMPTY_FIELD })
    }
    axios.post('/api/users', this.state)
      .then(res => {
        console.log('got to axios.post')
        if (res.status >= 200 && res.status < 300) {
          this.props.history.push({ pathname: '/user/' + res.data.secret })
        } else {
          console.log('it failed m8')
        }
      })
      .catch(err => {
        if (err.response.status === 409) {
          return this.setState({ alertType: alertTable.DUPLICATE_ACCOUNT })
        }
      })
    e.preventDefault()
  }

  // Sets state of inputs
  handleChange (e) {
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
        <h2>Social Circle or whatever the name is</h2>
        <h5>Some sort of explanation for how the app works</h5>
        <form onSubmit={this.handleSubmit}>
          <p>firstName:</p>
          <input
            type='text'
            name='firstName'
            onChange={this.handleChange}
          />
          <p>lastName:</p>
          <input
            type='text'
            name='lastName'
            onChange={this.handleChange}
          />
          <p>Email:</p>
          <input
            type='email'
            name='email'
            onChange={this.handleChange}
          />
          <input type='submit' value='Submit' />

        </form>
        <SignupAlert alertType={this.state.alertType} />
      </div>
    )
  }
}
export default Login

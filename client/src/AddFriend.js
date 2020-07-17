import React from 'react'
import axios from 'axios'
import { Button, Spinner} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

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
      friendemail: '',
      isloading: false
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
    this.setState({isloading: true})
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
        this.setState({isloading: false})
      })
      .catch(err => {
        if (err.response.status === 409) {
          window.alert('You are already friends with this person')
        }
        this.setState({isloading: false})
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
          {!this.state.isloading && submitButton()}
          {this.state.isloading && loadButton()}
        </form>
            
        <h5>Total Count</h5>
        <h5>0</h5>
      </div>
    )
  }
}

function loadButton() {
  return (
    <>
  <Button variant="secondary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>
</>
  
  );
}
function submitButton() {
  return (
    <input type='submit' value='Add Friend' />
  )
}



export default AddFriend

import React from 'react'
import axios from 'axios'


class AddFriend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      friendships: [],
      friendfirstname: 'Friends first name',
      friendlastname: 'Friends last name',
      friendemail: 'Friends email'
    }
  }

  
  
  componentDidMount () {
    axios.get(`/api${this.props.location.pathname}`)
      .then(res => {
        console.log(res)
        // const user = res.data[0]
        // this.setState({
        //   firstname: user.firstname,
        //   lastname: user.lastname
        // })
      })
    // Capitalize the name cause I forgot we passed everything into db as lowercase
  }

  handleAdd(e) {
    // check for empty inputs
    // 


  }

  handleChange(e) {

  }
  

  render () {
    return (
      <div>
        <h2>Social Circle</h2>
        <h5>Hi {this.state.firstname} {this.state.lastname}! Add your friends below.</h5>

        {/* <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
        </ul> */}

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
        <input type="submit" value="Add Friend" />
        </form>

        <h5>Total Count</h5>
        <h5>0</h5>
      </div>
    )
  }
}

export default AddFriend

import React from 'react';
import axios from 'axios';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";


class Login extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Home} exact/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(e) {
    // Implement check for duplicate users
   
    if (!this.state.firstname || !this.state.lastname || !this.state.email) {
      alert('Input field empty')
    } else {
      axios.post(`/api/users`, this.state)
      .then(req  => {
        console.log(this.state);
        if (req.status >= 200){
          console.log("Data sent");
          // redirect user to add friends page
        } else {
          console.log("it failed m8");
        }
      });
    }

    
    e.preventDefault();
  }

  // Sets state of inputs
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    return (

      <div>
        <h2>Social Circle or whatever the name is</h2>
        <h5>Some sort of explanation for how the app works</h5>

        <form onSubmit={this.handleSubmit}>
          <p>Firstname:</p>
          <input
            type='text'
            name='firstname'
            onChange={this.handleChange}
          />
          <p>Lastname:</p>
          <input
            type='text'
            name='lastname'
            onChange={this.handleChange}
          />
          <p>Email:</p>
          <input
            type='email'
            name='email'
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
 
        </form>
      </div>

    );
  }
}



export default Login;

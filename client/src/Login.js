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
              {/* Add routes here */}
             <Route path="/" component={Home} exact/>
      
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = { 
      firstname: '',
      lastname: '',
      email: ''  
    }
  }


  handleClick() {
    console.log('Button has been pressed')
    
    axios.post(`/api/users`, this.state)
      .then(req  => {
        if (req.data.status === 'success'){
          console.log("Data sent"); 
          // this.resetForm()
        }else if(req.data.status === 'fail'){
          console.log("it failed m8");
        } 
      })
  }

  // Will need a way to clear from after submission
  resetForm() { 
  }


  render() {
    return (

      <div>
        <h2>Social Circle or whatever the name is</h2>
        <h5>Some sort of explanation for how the app works</h5>

        <form>
          <label htmlFor="firstname">First Name</label>
          <input id="firstname" name="firstname" type="text" />

          <label htmlFor="lastname">Last Name</label>
          <input id="lastname" name="lastname" type="text" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />

          <button onClick={this.handleClick}>Submit or die!</button>
        </form>
      </div>

    )
  }
}



export default Login;
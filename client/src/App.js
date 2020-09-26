import React from 'react'
import './App.css'
import Login from './Login/Login'
import UserNotFound from './ErrorHandling/UserNotFound'
import ServerError from './ErrorHandling/ServerError'
import AddFriend from './AddFriend/AddFriend'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <h2>Social Circle</h2>
          <Route exact path='/' component={Login} />
          <Route path='/user/:secret' component={AddFriend} />
          <Route path='/404' component={UserNotFound} />
          <Route path='/500' component={ServerError} />
        </div>
      </Router>
    )
  }
}
export default App

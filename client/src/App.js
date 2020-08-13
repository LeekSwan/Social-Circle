import React from 'react'
import './App.css'
import Login from './Login'
import UserNotFound from './UserNotFound'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddFriend from './AddFriend'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/user/:secret' component={AddFriend} />
          <Route path='/404' component={UserNotFound} />
        </div>
      </Router>
    )
  }
}
export default App

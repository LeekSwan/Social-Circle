import React from 'react'
import './App.css'
import Login from './Login'
import Parent from './Parent'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/user/:secret' component={Parent} />
        </div>
      </Router>
    )
  }
}
export default App

import React from 'react'
import './UserNotFound.css'

class UserNotFound extends React.Component {
  constructor (props) {
    super(props)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleRedirect() {
    this.props.history.push({ pathname: '/' })
  }

  render () {
    return (
      <body>
        <div id='notfound'>
          <div class='notfound'>
            <div class='notfound-404'>
              <h1>404</h1>
            </div>
            <h2>Oops! Nothing was found</h2>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <a href='/#' onClick={this.handleRedirect}>Return to homepage</a></p>
          </div>
        </div>
      </body>
    )
  }
}

export default UserNotFound

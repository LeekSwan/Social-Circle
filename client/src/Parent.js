import React from 'react'

import UserNotFound from './UserNotFound'

class Parent extends React.Component {
  render () {
    return (
      <UserNotFound location = {this.props.location}/>

    )
  }
}

export default Parent

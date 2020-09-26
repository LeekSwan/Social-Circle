import React from 'react'
import { Alert } from 'react-bootstrap'
import { alertTable } from '../constants'

class Alerts extends React.Component {
  render () {
    return (
      <div>
        {displayAlert(this.props.alertType, this.props.firstName, this.props.lastName)}
      </div>
    )
  }
}

// TODO: Set a 2 second timer to display alert before it disapears
function displayAlert (alertType, firstName, lastName) {
  if (alertType === alertTable.FRIEND_EXISTS) {
    return (
      <Alert variant='danger'>
      You are already friends with this person.
      </Alert>
    )
  } else if (alertType === alertTable.EMPTY_FIELD) {
    return (
      <Alert variant='warning'>
      Please fill all fields.
      </Alert>
    )
  } else if (alertType === alertTable.CREATED) {
    return (
      <Alert variant='success'>
      You are now friends with {firstName} {lastName}.
      </Alert>
    )
  } else if (alertType === alertTable.FRIEND_REMOVED) {
    return (
      <Alert variant='success'>
      Friend removed.
      </Alert>
    )
  }
}
export default Alerts

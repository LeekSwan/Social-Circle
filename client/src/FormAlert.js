import React from 'react'
import { Alert } from 'react-bootstrap'

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
  if (alertType === 'friendshipExists') {
    return (
      <Alert variant='danger'>
      You are already friends with this person.
      </Alert>
    )
  } else if (alertType === 'emptyField') {
    return (
      <Alert variant='warning'>
      Please fill all fields.
      </Alert>
    )
  } else if (alertType === 'created') {
    return (
      <Alert variant='success'>
      You are now friends with {firstName} {lastName}
      </Alert>
    )
  }
}
export default Alerts

import React from 'react'
import { Alert } from 'react-bootstrap'

class Alerts extends React.Component {
  render () {
    return (
      <div>
        {displayAlert(this.props.alertType)}
      </div>
    )
  }
}

// TODO: Set a 2 second timer to display alert before it disapears
function displayAlert (alertType) {
  if (alertType === 'duplicateAccount') {
    return (
      <Alert variant='danger'>
      You have already created an account with this email! Please check your email to login.
      </Alert>
    )
  } else if (alertType === 'emptyField') {
    return (
      <Alert variant='warning'>
      Please fill all fields.
      </Alert>
    )
  }
}
export default Alerts

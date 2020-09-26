import React from 'react'
import { Alert } from 'react-bootstrap'
import { alertTable } from '../constants'

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
  if (alertType === alertTable.DUPLICATE_ACCOUNT) {
    return (
      <Alert variant='danger'>
      You have already created an account with this email! Please check your email to login.
      </Alert>
    )
  } else if (alertType === alertTable.EMPTY_FIELD) {
    return (
      <Alert variant='warning'>
      Please fill all fields.
      </Alert>
    )
  }
}
export default Alerts

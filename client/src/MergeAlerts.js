import React from 'react'
import { Alert } from 'react-bootstrap'
import { alertTable } from './constants'

class Alerts extends React.Component {
  render () {
    return (
      <div>
        {displayAlert(this.props.alertType)}
      </div>
    )
  }
}

function displayAlert (alertType) {
  if (alertType === alertTable.MERGED) {
    return (
      <Alert variant='success'>
      Account has been successfully merged.
      </Alert>
    )
  } else if (alertType === alertTable.BAD_URL) {
    return (
      <Alert variant='danger'>
      Invalid URL.
      </Alert>
    )
  } else if (alertType === alertTable.NONEXISTENT_ACCOUNT) {
    return (
      <Alert variant='danger'>
      This account does not exist.
      </Alert>
    )
  } else if (alertType === alertTable.ALREADY_MERGED) {
    return (
      <Alert variant='danger'>
      This account has already been merged. Please choose an unmerged account.
      </Alert>
    )
  }
}
export default Alerts

import React from 'react'
import { Alert } from 'react-bootstrap'
import { alertTable } from './constants'

class Alerts extends React.Component {
  render () {
    return (
      <>
        {displayAlert(this.props.alertType, this.props.email)}
      </>
    )
  }
}

function displayAlert (alertType, email) {
  switch (alertType) {
    case alertTable.MERGED:
      return (
        <Alert variant='success'>
        The account registered under <i>'{email}'</i> has been merged to this account.
        </Alert>
      )
    case alertTable.EMPTY_FIELD:
      return (
        <Alert variant='warning'>
        Please fill all fields.
        </Alert>
      )
    case alertTable.BAD_URL:
      return (
        <Alert variant='danger'>
        Invalid URL.
        </Alert>
      )
    case alertTable.NONEXISTENT_ACCOUNT:
      return (
        <Alert variant='danger'>
        This account was not found. Please double check that you have included the entire URL or that the account has not been deleted.
        </Alert>
      )
    case alertTable.ALREADY_MERGED:
      return (
        <Alert variant='danger'>
        This account has already been merged. Please make sure that you have the right URL.
        </Alert>
      )
    default: return null
  }
}
export default Alerts

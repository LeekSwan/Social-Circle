import React from 'react'
import { Alert } from 'react-bootstrap'

class Alerts extends React.Component {
	render() {
		return (
			<div>
				{displayAlert(this.props.state)}
			</div>
		)
	}
}

// TODO: Set a 2 second timer to display alert before it disapears
function displayAlert (state) {
	if (state.status === 1) {
		return (
      <Alert variant='danger'>
      You have already created an account with this email! Please check your email to login.
      </Alert>
    )
	} else if (state.status === 409) {
    return (
      <Alert variant='danger'>
      You are already friends with this person.
      </Alert>
    )
  } else if (state.status === 406) {
    return (
      <Alert variant='warning'>
      Please fill all fields.
      </Alert>
    )
  } else if (state.status === 201) {
    return (
      <Alert variant='success'>
      You are now friends with {state.friendFName} {state.friendLName}
      </Alert>
    )
  }
}

export default Alerts
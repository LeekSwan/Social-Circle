import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

class DeleteButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDelete: false
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  // Handlers for delete button
  handleClose () { this.setState({ showDelete: false }) }
  handleShow () { this.setState({ showDelete: true }) }
  handleDelete (e) {
    axios.delete(`/api${this.props.location.pathname}`)
      .then(res => {
        console.log('got to delete.then')
        this.props.history.push({ pathname: '/' })
      })
  }

  render () {
    return (
      <div>
        <Button variant='danger' onClick={this.handleShow}>
          Delete Account
        </Button>

        <Modal show={this.state.showDelete} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Deleting account will delete user and friendships</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant='danger' onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default DeleteButton

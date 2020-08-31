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
    this.handleCloseDelete = this.handleCloseDelete.bind(this)
    this.handleShowDelete = this.handleShowDelete.bind(this)
  }

  handleShowDelete () { this.setState({ showDelete: true }) };
  handleCloseDelete () { this.setState({ showDelete: false }) };
  handleDelete (e) {
    axios.delete(`/api${this.props.location.pathname}`)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push({ pathname: '/' })
        }
      })
  }

  render () {
    return (
      <div>
        <Button variant='danger' onClick={this.handleShowDelete}>
          Delete Account
        </Button>
        <Modal show={this.state.showDelete} onHide={this.handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Deleting account will delete user and friendships</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleCloseDelete}>
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

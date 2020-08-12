import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

class RemoveFriendButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDelete: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  // Handlers for delete button
  handleClose () { this.setState({ showDelete: false }) };
  handleShow () { this.setState({ showDelete: true }) };

  handleRemove (friendId) {
    this.props.handleFriendRemoval(friendId)
    axios.delete(`/api/friendships${this.props.location.pathname}`, { data: { userId: this.props.userId, friendId:  friendId } })
      .catch(err => {
        console.log(err)
      })
    this.setState({ showDelete: false })
  }

  render () {
    return (
      <div>
        <Button variant='danger' onClick={this.handleShow}>
          X
        </Button>

        <Modal show={this.state.showDelete} onHide={this.handleClose}>
          <Modal.Body>This person will be removed from your friends list</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant='danger' onClick={() =>  this.handleRemove(this.props.friendId)  }>
              Unfriend
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default RemoveFriendButton

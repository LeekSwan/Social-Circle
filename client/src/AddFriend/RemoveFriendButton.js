import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

class RemoveFriendButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDelete: false
    }
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (friendId) {
    this.props.onHandleFriendRemoval(friendId)
    axios.delete(`/api${this.props.location.pathname}/friendships/${friendId}`, { data: { userId: this.props.userId } })
      .catch(err => {
        console.log(err)
      })
    this.setState({ showDelete: false })
  }

  render () {
    return (
      <div>
        <Button variant='danger' onClick={() => this.setState({ showDelete: true })}>
          X
        </Button>

        <Modal show={this.state.showDelete} onHide={() => this.setState({ showDelete: false })}>
          <Modal.Body>This person will be removed from your friends list</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => this.setState({ showDelete: false })}>
              Cancel
            </Button>
            <Button variant='danger' onClick={() => this.handleRemove(this.props.friendId)}>
              Unfriend
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default RemoveFriendButton

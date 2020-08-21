import React from 'react'
import axios from 'axios'
import { Button, Modal, Dropdown, InputGroup, FormControl } from 'react-bootstrap'

class DeleteButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDelete: false,
      showMerge: false,
      mergeUrl: ''
    }
    this.handleCloseDelete = this.handleCloseDelete.bind(this)
    this.handleCloseMerge = this.handleCloseMerge.bind(this)
    this.handleShowDelete = this.handleShowDelete.bind(this)
    this.handleShowMerge = this.handleShowMerge.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMerge = this.handleMerge.bind(this)

  }

  // Handlers for delete button
  handleShowDelete () { this.setState({ showDelete: true }) };
  handleShowMerge () { this.setState({ showMerge: true })}
  handleCloseDelete () { this.setState({ showDelete: false }) };
  handleCloseMerge () { this.setState({ showMerge: false }) };
  
  handleDelete (e) {
    axios.delete(`/api${this.props.location.pathname}`)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push({ pathname: '/' })
        }
      })
  }
  handleMerge (e) {
    console.log(this.state.mergeUrl)
    axios.put(`/api${this.props.location.pathname}`, { mergeUrl: this.state.mergeUrl })
      .then(res => {
        //TODO: add alert for bad url
        //TODO: add alert on success
        console.log('got to delete.then') 
      })
  }

  handleChange(e) {
    this.setState({mergeUrl: e.target.value })
  }


  render() {
    return (
        <div>
          <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Settings
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
         
                <Button variant='danger' onClick={this.handleShowDelete}>
                Delete Account
                </Button>
                <Modal show={this.state.showDelete} onHide={this.handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deleting account will delete user and friendships</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseDelete}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Dropdown.Item>
            <Dropdown.Item>

                <Button variant='danger' onClick={this.handleShowMerge}>
                Merge Accounts
                </Button>
                <Modal show={this.state.showMerge} onHide={this.handleCloseMerge}>
                    <Modal.Header closeButton>
                        <Modal.Title>Merge Accounts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please input the url of your old account that you would like to merge to your current one.</Modal.Body>
                      <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Url</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Url"
                        aria-describedby="basic-addon1"
                        type="text" value = {this.state.mergeUrl} onChange={this.handleChange}
                      />
                      </InputGroup>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseMerge}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => {this.handleMerge(); this.handleCloseMerge();}}>
                            Merge
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>
    )
  }
}



export default DeleteButton

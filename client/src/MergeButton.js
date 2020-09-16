import React from 'react'
import axios from 'axios'
import MergeAlert from './MergeAlerts'
import { alertTable } from './constants'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'

class MergeButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMerge: false,
      mergeUrl: '',
      alertType: '',
      mergeEmail: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMerge = this.handleMerge.bind(this)
  }

  handleMerge (e) {
    if (!this.state.mergeUrl) { return this.setState({ alertType: alertTable.EMPTY_FIELD }) }
    axios.put(`/api${this.props.location.pathname}/merge`, { mergeUrl: this.state.mergeUrl })
      .then(res => {
        // TODO: Edge Case - merging an old account who has og account as a friend
        if (res.status >= 200 && res.status < 300) {
          return this.setState({ alertType: alertTable.MERGED, mergeEmail: res.data })
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          return this.setState({ alertType: alertTable.BAD_URL })
        } else if (err.response.status === 404) {
          return this.setState({ alertType: alertTable.NONEXISTENT_ACCOUNT })
        } else if (err.response.status === 409) {
          return this.setState({ alertType: alertTable.ALREADY_MERGED })
        }
      })
  }

  handleChange (e) {
    this.setState({ mergeUrl: e.target.value })
  }

  render () {
    return (
      <div>
        <Button variant='danger' onClick={() => this.setState({ showMerge: true })}>
          Merge Accounts
        </Button>
        <Modal show={this.state.showMerge} onHide={() => this.setState({ showMerge: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Merge Accounts</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please input the url of your old account that you would like to merge to your current one.
            Merging your old account transfers all friends to your current account. Please
            note that once merged, you will not be able to access your old account.
          </Modal.Body>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>Url</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label='Url'
              aria-describedby='basic-addon1'
              placeholder='Paste your full url here'
              type='text' value={this.state.mergeUrl} onChange={this.handleChange}
            />
          </InputGroup>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => this.setState({ showMerge: false })}>
                      Cancel
            </Button>
            <Button variant='danger' onClick={this.handleMerge}>
                      Merge
            </Button>
          </Modal.Footer>
          {this.state.alertType &&
            <MergeAlert alertType={this.state.alertType} email={this.state.mergeEmail} />}
        </Modal>
      </div>
    )
  }
}

export default MergeButton

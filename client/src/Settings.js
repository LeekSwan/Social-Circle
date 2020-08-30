import React from 'react'
import DeleteButton from './DeleteButton'
import MergeButton from './MergeButton'
import { Dropdown } from 'react-bootstrap'

class Settings extends React.Component {
  render () {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Settings
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <DeleteButton location={this.props.location} history={this.props.history} />
            </Dropdown.Item>
            <Dropdown.Item>

              <MergeButton location={this.props.location} />

            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

export default Settings

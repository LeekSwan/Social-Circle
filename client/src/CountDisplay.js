import React from 'react'
import axios from 'axios'
import { Button, Spinner } from 'react-bootstrap'

class CountDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      exposure: 0,
      isLoading: false
    }
  }

  updateExposure () {
    axios.get(`/api${this.props.location.pathname}/exposure`)
      .then(res => {
        this.setState({ exposure: res.data.exposure })
      }).catch(err => {
        console.log(err)
      })
  }

  async handleRefresh () {
    this.setState({ isLoading: true })
    await this.updateExposure()
    this.setState({ isLoading: false })
  }

  componentDidMount () {
    this.updateExposure()
  }

  render () {
    return (
      <div>
        <h5>Total Count</h5>
        <h5>
          {this.state.isLoading
            ? <Spinner
              animation='border'
              size='sm'
              role='status'
              />
            : this.state.exposure}
        </h5>
        <Button
          onClick={this.handleRefresh.bind(this)}
          variant='outline-secondary'
        >
          Refresh
        </Button>
      </div>
    )
  }
}

export default CountDisplay

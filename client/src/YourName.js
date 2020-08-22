import React, { useState } from 'react'
import { Form, Col, Button, Spinner } from 'react-bootstrap'

class YourName extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      isEditing: false
    }
  }

  renderEditNameForm () {
    return (
      'textbox goes here'
    )
  }

  renderNameForm () {
    const { userId, firstName, lastName } = this.props
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Row>
            <Col>
              <Form.Control value={ firstName } onChange={(e) => this.props.onChange(e.target.value, lastName)}/>
            </Col>
            <Col>
              <Form.Control value={ lastName } onChange={(e) => this.props.onChange(firstName, e.target.value)}/>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    )
  }

  render () {
    const { userId, firstName, lastName } = this.props

    return (
      <div className='name-container'>
        <span>Hi ***{userId}***</span>
          { this.state.isEditing
            ? this.renderNameForm()
            : <span>{firstName} {lastName}</span>
          }
        <Button
          className='name-edit-button'
          variant='secondary'
          onClick={ () => this.setState({ isEditing: !this.state.isEditing }) }
        >
        { this.state.isEditing ? 'save' : 'edit' }
        </Button>
      </div>
    )
  }
}

export default YourName

import React from 'react'
import { Form, Button } from 'react-bootstrap'
import Loading from '../Loading'
import { Redirect } from 'react-router-dom'

export default class EmailPasswordSignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      redirectNow: false,
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    // get email and password from state
    const { email, password } = this.state
    this.setState({ loading: true })
    // sign user in
    this.props.firebase
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => setTimeout(() =>
        // gotta use a timeout because firebase is still loading 🤔
        this.setState({ loading: false, redirectNow: true }),
        1000
      ))
      .catch(error => this.setState({ error: error.message, loading: false }))
  }

  handleChange = event => {
    // use the name field as the index for the object
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, password, error, loading, redirectNow } = this.state
    return (

      <Form onSubmit={this.handleSubmit}>

        {error}
        {loading ? <Loading /> : ''}
        {redirectNow ? <Redirect to="/home" /> : ''}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.handleChange}
            autoComplete="email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
            autoComplete="password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
      </Button>
      </Form>
    )
  }
}
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import Loading from '../Loading'
import withFirebase from '../../contexts/withFirebase'
import withAuth from '../../contexts/withAuth'

class EmailPasswordSignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      redirectNow: false
    }
  }

  handleSubmit = event => {
    //event.preventDefault()
    // get email and password from state
    const { email, password } = this.state
    this.setState({ loading: true })
    // sign user in
    this.props.firebase.auth
      .signInWithEmailAndPassword(email, password)
      .then(() =>
        setTimeout(
          () =>
            // gotta use a timeout because firebase is still loading 🤔
            this.setState({ loading: false, redirectNow: true }),
          1000
        )
      )
      .catch(error => this.setState({ error: error.message, loading: false }))
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { email, password, error, loading, redirectNow } = this.state
    return (
      <Grid
        textAlign='center'
        style={{ height: 'calc(100vh - 64px)' }}
        verticalAlign='middle'
      >
        {this.props.auth.loggedIn ? <Redirect to='/home' /> : ''}
        <Grid.Column style={{ maxWidth: 450 }}>
          {loading ? <Loading /> : ''}
          {redirectNow ? <Redirect to='/home' /> : ''}
          <Header as='h2' color='violet' textAlign='center'>
            <Image src='/logo.png' /> Sign In to your account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                onChange={this.handleChange}
                fluid
                name='email'
                value={email}
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                value={password}
                onChange={this.handleChange}
              />

              <Form.Button color='violet' fluid size='large'>
                Sign In
              </Form.Button>
            </Segment>
          </Form>
          {error ? <Message color='red'>{error}</Message> : ''}
          <Message>
            New to us? <Link to='/signup'>&nbsp;Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default withAuth(withFirebase(EmailPasswordSignUp))

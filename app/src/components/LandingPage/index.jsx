import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='violet' textAlign='center'>
        <Image src='/logo.png' /> Littleson Family Artefacts
      </Header>
      <Form size='large'>
        <Segment stacked style={{ display: 'grid', gridGap: '1rem' }}>
          <Link to='/signin'>
            <Button color='violet' fluid size='large'>
              Sign In
          </Button>
          </Link>
        </Segment>
      </Form>
      <Message>
        New to us?
        <Link to='/signup'>
          &nbsp;Sign Up
          </Link>
      </Message>
    </Grid.Column>
  </Grid >
)

export default LoginForm
import React from 'react'
import withFirebase from '../../contexts/withFirebase'
import EmailPasswordSignUp from './EmailPasswordSignUp'
import { Container, Col, Row } from 'react-bootstrap'

class LoginPage extends React.Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <h4>Sign Up</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <EmailPasswordSignUp firebase={this.props.firebase} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withFirebase(LoginPage)
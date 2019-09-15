import React from 'react'
import FirebaseContext from '../../contexts/FirebaseContext'
import EmailPasswordSignIn from './EmailPasswordSignIn'
import { Container, Col, Row } from 'react-bootstrap'

export default class LoginPage extends React.Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <h4>Sign In</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <FirebaseContext.Consumer>
              {
                firebase => <EmailPasswordSignIn firebase={firebase} />
              }
            </FirebaseContext.Consumer>
          </Col>
        </Row>
      </Container>
    )
  }
}
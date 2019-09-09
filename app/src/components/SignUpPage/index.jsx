import React from 'react'
import FirebaseContext from '../../contexts/FirebaseContext'
import EmailPasswordSignUp from './EmailPasswordSignUp'
import { Container, Col, Row } from 'react-bootstrap'

export default class LoginPage extends React.Component {
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
            <FirebaseContext.Consumer>
              {
                firebase => <EmailPasswordSignUp firebase={firebase} />
              }
            </FirebaseContext.Consumer>
          </Col>
        </Row>
      </Container>
    )
  }
}
import React from 'react'
import { Badge } from 'react-bootstrap'
import './Logout.css'
export default class Logout extends React.Component {
  handleClick = () => {
    this.props.firebase.auth.signOut()
  }
  render() {
    return (
      <div className="badge-logout" onClick={this.handleClick}>
        <Badge variant="secondary">Logout</Badge>
      </div>
    )
  }
}
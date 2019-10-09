import React from 'react'
import './Logout.css'
export default class Logout extends React.Component {
  handleClick = () => {
    this.props.firebase.auth.signOut()
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        Logout
      </div>
    )
  }
}
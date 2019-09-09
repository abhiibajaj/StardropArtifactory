import React from 'react'
import AuthContext from '../contexts/AuthContext'
import { Route, Redirect } from 'react-router-dom'
import Loading from './Loading'

export default class AuthRoute extends React.Component {
  render() {
    // if the user is authenticated
    // go ahead and render the component
    // otherwise, redirect to login
    const exact = this.props.exact ? true : false
    const path = this.props.path
    return (
      <AuthContext.Consumer>{
        user => (
          <Route exact={exact} path={path} render={
            () => (
              (user.loggedIn === true)
                ? this.props.children
                : (user.loggedIn === false)
                  ? <Redirect to='/signin' />
                  : <Loading />
            )
          } />
        )
      }
      </AuthContext.Consumer>
    )
  }
}
import React from 'react'
import withAuth from '../contexts/withAuth'
import { Route, Redirect } from 'react-router-dom'
import Loading from './Loading'

class AuthRoute extends React.Component {
  routeRenderHandler = routerProps => {
    const auth = this.props.auth
    const Component = this.props.component
    return (
      (auth.loggedIn === true)
        ? <Component {...routerProps} />
        : (auth.loggedIn === false)
          ? <Redirect to='/' />
          : <Loading />
    )
  }
  render() {
    // if the user is authenticated
    // go ahead and render the component
    // otherwise, redirect to login
    const exact = this.props.exact ? true : false
    const path = this.props.path
    return (
      <Route exact={exact} path={path} render={this.routeRenderHandler} />
    )
  }
}

export default withAuth(AuthRoute)

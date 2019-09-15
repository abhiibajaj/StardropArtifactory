import React from 'react'
import AuthContext from './AuthContext'

export default function withAuth(Component) {
  return props => (
    <AuthContext.Consumer>
      {auth => <Component auth={auth} {...props} />}
    </AuthContext.Consumer>
  )
}
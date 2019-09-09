import React from 'react'

const AuthContext = React.createContext({
  loggedIn: null,
  data: {}
})

export default AuthContext
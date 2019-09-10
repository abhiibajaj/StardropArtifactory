import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ConfiguredFirebase from './contexts/ConfiguredFirebase'
import FirebaseContext from './contexts/FirebaseContext'
import AuthContext from './contexts/AuthContext'

class ContextInjector extends React.Component {
  constructor(props) {
    super(props)
    // init firebase
    const firebase = new ConfiguredFirebase()

    // watch the user state,
    // update the local user state when firebase changes its user state
    firebase.auth.onAuthStateChanged(u => {
      this.setState({
        auth: {
          loggedIn: u ? true : false,
          data: { ...u }
        }
      })
    })
    // INITIAL STATE
    this.state = {
      firebase,
      auth: {
        loggedIn: null,
        data: {}
      }
    }
  }

  // Wrap children with these contexts
  render() {
    const { auth, firebase } = this.state
    return (
      // provide firebase and auth for all children 🔥
      <FirebaseContext.Provider value={firebase}>
        <AuthContext.Provider value={auth}>
          {this.props.children}
        </AuthContext.Provider>
      </FirebaseContext.Provider>
    )
  }
}

ReactDOM.render(
  <ContextInjector>
    <App />
  </ContextInjector>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
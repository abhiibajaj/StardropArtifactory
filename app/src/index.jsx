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
    const firebase = new ConfiguredFirebase()

    // update the user state when firebase changes
    firebase.auth.onAuthStateChanged(u => {
      this.setState({
        user: {
          loggedIn: u ? true : false,
          data: { ...u }
        }
      })
    })

    this.state = {
      firebase,
      user: {
        loggedIn: null,
        data: {}
      }
    }
  }

  render() {
    const { user, firebase } = this.state
    return (
      // provide firebase for all children 🔥
      <FirebaseContext.Provider value={firebase}>
        <AuthContext.Provider value={user}>
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
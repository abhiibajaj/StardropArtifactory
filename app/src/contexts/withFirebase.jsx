import React from 'react'
import FirebaseContext from './FirebaseContext'

export default function withFirebase(Component) {
  return props => (
    <FirebaseContext.Consumer>
      {firebase => (<Component firebase={firebase} {...props} />)}
    </FirebaseContext.Consumer>
  )
}
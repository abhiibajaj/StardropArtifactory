import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import LandingPage from './components/LandingPage'
import SignInPage from './components/SignInPage'
import SignUpPage from './components/SignUpPage'
import Navbar from './components/Navbar'
import AuthRoute from './components/AuthRoute'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" exact component={LandingPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <AuthRoute path='/home'>
          <HomePage />
        </AuthRoute>
      </Router>
    </div>
  )
}



export default App

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import HomePage from './components/HomePage'
import LandingPage from './components/LandingPage'
import SignInPage from './components/SignInPage'
import SignUpPage from './components/SignUpPage'
import Navbar from './components/Navbar'
import AuthRoute from './components/AuthRoute'
import ArtifactPage from './components/ArtifactPage'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" exact component={LandingPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <AuthRoute path='/home' component={HomePage} />
        <Route path="/artifact/:artifactId" component={ArtifactPage} />
      </Router>
    </div>
  )
}

export default App

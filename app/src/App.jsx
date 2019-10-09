import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "font-awesome/css/font-awesome.css"
import "semantic-ui-css/semantic.min.css"
import HomePage from "./components/HomePage"
import LandingPage from "./components/LandingPage"
import SignInPage from "./components/SignInPage"
import SignUpPage from "./components/SignUpPage"
import Navbar from "./components/Navbar"
import AuthRoute from "./components/AuthRoute"
import AddArtifactPage from "./components/AddArtifactPage"
import ArtifactPage from "./components/ArtifactPage"
import EditPage from "./components/EditPage"
import withAuth from "./contexts/withAuth"

function App(props) {
  return (
    <div>
      <Router>
        {/* Show the navbar if logged in */}
        {props.auth.loggedIn ? <Navbar /> : ''}

        <Route path="/" exact component={LandingPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <AuthRoute path="/home" component={HomePage} />
        <AuthRoute path="/addartifact" component={AddArtifactPage} />
        <AuthRoute
          path="/artifact/:artifactId"
          exact
          component={ArtifactPage}
        />
        <AuthRoute
          path="/artifact/edit/:artifactId"
          exact
          component={EditPage}
        />
      </Router>
    </div>
  )
}

export default withAuth(App)

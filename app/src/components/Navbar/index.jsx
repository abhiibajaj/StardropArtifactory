import React from 'react'
import { Link } from "react-router-dom"
import AuthContext from '../../contexts/AuthContext'
import FirebaseContext from '../../contexts/FirebaseContext'
import { Navbar, Nav } from 'react-bootstrap'
import Logout from './Logout'
import './index.css'

const NavLinks = () => (
  <AuthContext.Consumer>
    {
      user => (
        <FirebaseContext.Consumer>
          {
            firebase => (
              user.loggedIn
                ? (
                  <Nav className="justify-content-end">
                    <Navbar.Text>
                      <span className="user-display">
                        {
                          user.loggedIn
                            ? user.data.email
                            : ''
                        }
                      </span>
                    </Navbar.Text>
                    <Logout firebase={firebase} />
                  </Nav>
                )
                : (
                  <Nav className="justify-content-end">
                    <Nav.Item>
                      <Link to='/signin'>
                        <span className="nav-link-button">Sign In</span>
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link to='/signup'>
                        <span className="nav-link-button">Sign Up</span>
                      </Link>
                    </Nav.Item>
                  </Nav>
                )
            )
          }
        </FirebaseContext.Consumer>
      )
    }
  </AuthContext.Consumer>
)

const TopNavbar = () => (
  <Navbar collapseOnSelect expand="lg" bg="light">
    <Navbar.Brand>
      <Link to='/home'>
        <span className="logo-text">Stardrop</span>
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse className="justify-content-end">
      <NavLinks />
    </Navbar.Collapse>
  </Navbar>
)

export default TopNavbar
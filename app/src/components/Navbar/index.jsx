import React from 'react'
import { Link } from "react-router-dom"
import withAuth from '../../contexts/withAuth'
import withFirebase from '../../contexts/withFirebase'
import { Navbar, Nav } from 'react-bootstrap'
import Logout from './Logout'
import './index.css'

const NavLinks = ({ auth, firebase }) => (
  <div>
    {
      auth.loggedIn
        ? (
          <Nav className="justify-content-end">
            <Navbar.Text>
              <span className="user-display">
                {
                  auth.loggedIn
                    ? auth.data.email
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
    }
  </div>
)

const TopNavbar = ({ auth, firebase }) => (
  <Navbar collapseOnSelect expand="lg" bg="light">
    <Navbar.Brand>
      <Link to='/home'>
        <span className="logo-text">Stardrop</span>
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse className="justify-content-end">
      <NavLinks auth={auth} firebase={firebase} />
    </Navbar.Collapse>
  </Navbar>
)

export default withAuth(withFirebase(TopNavbar))
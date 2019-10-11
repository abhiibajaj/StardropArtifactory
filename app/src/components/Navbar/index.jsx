import React from "react"
import { Link } from "react-router-dom"
import withAuth from "../../contexts/withAuth"
import withFirebase from "../../contexts/withFirebase"
import { Menu, Segment, Dropdown, Icon } from "semantic-ui-react"
import Logout from "./Logout"
import "./index.css"

const TopNavbar = ({ auth, firebase }) => (
  <Segment style={{ borderRadius: 0, margin: 0, padding: 0 }}>
    <Menu secondary style={{ margin: 0, padding: 0 }}>
      <Menu.Item>
        <Link to="/home">
          <img alt="home" height="32px" width="32px" src="/logo.png" />
        </Link>
      </Menu.Item>

      {auth.loggedIn ? (
        <Menu.Menu position="right">
          <Menu.Item name="search">
            <Link to="/home">
              <Icon name="home" fitted size="large" color="violet" />
            </Link>
          </Menu.Item>
          <Menu.Item name="addartifact">
            <Link to="/addartifact">
              <Icon
                name="plus square outline"
                fitted
                size="big"
                color="violet"
              />
            </Link>
          </Menu.Item>
          <Menu.Item name="slideshow">
            <Link to="/slideshow">
              <Icon name="tv" fitted size="large" color="violet" />
            </Link>
          </Menu.Item>
          <Dropdown item text={auth.loggedIn ? auth.data.email : ""}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Logout firebase={firebase} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item>
            <Menu.Item>
              <Link to="/signin">Sign In</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/signup">Sign Up</Link>
            </Menu.Item>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  </Segment>
)

export default withAuth(withFirebase(TopNavbar))

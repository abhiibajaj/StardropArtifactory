import React from "react"
import withFirebase from "../../contexts/withFirebase"
import Search from '../Search'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Search />
      </div>
    )
  }
}

export default withFirebase(HomePage)
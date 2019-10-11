import React from "react"
import withFirebase from "../../contexts/withFirebase"
import Search from "../Search"
import { Link } from "react-router-dom"
import ArtifactOfTheDay from "../ArtifactOfTheDay"
import { Grid } from "semantic-ui-react"
class HomePage extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Search />
        </Grid.Column>
        <Grid.Column width={4} style={{ padding: "10em 2em" }}>
          <ArtifactOfTheDay />
        </Grid.Column>
      </Grid>
    )
  }
}

export default withFirebase(HomePage)

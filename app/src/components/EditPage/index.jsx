import React from "react"
import withFirebase from "../../contexts/withFirebase"
import EditForm from "./EditForm"
import ArtifactSlider from "../ArtifactPage/ArtifactSlider"
import { Segment, Grid, Header } from "semantic-ui-react"

class EditPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artifactId: this.props.match.params.artifactId,
      data: {},
      isLoading: true,
      artifactExists: false,
      tags: []
    }
  }
  componentDidMount() {
    this.fetchArtifact()
  }

  fetchArtifact = async () => {
    const artifactId = this.state.artifactId
    console.log("getting artifact with id: " + artifactId)
    let artifact = this.props.firebase.db
      .collection("artifacts")
      .doc(artifactId)
    try {
      const artifactDoc = await artifact.get()
      if (!artifactDoc.exists) {
        this.setState({ isLoading: false, artifactExists: false })
        return
      }
      console.log(artifactDoc.data())
      this.setState({
        data: artifactDoc.data(),
        isLoading: false,
        artifactExists: true
      })
    } catch (e) {
      console.log("Error getting document:", e)
    }
  }

  buildEditForm = () => {
    return (
      <div>
        <EditForm
          artifactData={this.state.data}
          artifactId={this.state.artifactId}
          firebase={this.props.firebase}
        />
      </div>
    )
  }

  render() {
    return (
      <Segment vertical>
        <Grid
          centered={true}
          verticalAlign="bottom"
          style={{ padding: "2em 0em" }}
        >
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Header color="violet" as="h1" style={{ fontSize: "2em" }}>
                Editing Artifact
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={5}>
              <ArtifactSlider
                data={this.state.data}
                isLoading={this.state.isLoading}
                artifactExists={this.state.artifactExists}
              />
            </Grid.Column>

            <Grid.Column width={4}>
              <Grid.Column>
                {!this.state.isLoading &&
                  this.state.artifactExists &&
                  this.buildEditForm()}
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default withFirebase(EditPage)

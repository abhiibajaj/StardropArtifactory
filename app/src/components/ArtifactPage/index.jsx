import React from "react"
import withFirebase from "../../contexts/withFirebase"
import {
  Segment,
  Grid,
  Divider,
  Header,
  Label,
  Message
} from "semantic-ui-react"
import EditIcon from "./EditIcon"
import Comments from "./Comments"
import ArtifactSlider from "./ArtifactSlider"

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

class ArtifactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artifactId: this.props.match.params.artifactId,
      data: {},
      isLoading: true,
      artifactExists: false,
      tags: [],
      createdTimeString: ""
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
        this.setState({ artifactExists: false, isLoading: false })
        return
      }
      console.log(artifactDoc.data())
      this.setState({
        data: artifactDoc.data(),
        artifactExists: true,
        isLoading: false,
        createdTimeString: new Date(
          artifactDoc.data().createdTime.seconds * 1000
        ).toDateString()
      })
      this.buildTags()
    } catch (e) {
      console.log("Error getting document:", e)
    }
  }

  buildTags = () => {
    let allTags = this.state.data.tags.filter(unique)
    allTags.forEach((tag, index) => {
      let tags = this.state.tags
      let label = (
        <Label as="a" tag key={index} size="mini">
          {tag}
        </Label>
      )
      tags.push(label)
      this.setState({ tags: tags })
    })
  }

  render() {
    return this.state.artifactExists || this.state.isLoading ? (
      <Segment vertical>
        <Grid
          centered={true}
          verticalAlign="bottom"
          style={{ padding: "2em 0em" }}
        >
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Header color="violet" as="h1" style={{ fontSize: "2em" }}>
                {this.state.data.title}
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
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Header as="h3">Description</Header>
                  <p style={{ fontSize: "1.33em" }}>
                    {this.state.data.description}
                  </p>
                  <Header as="h3">Date of Origin</Header>
                  <p style={{ fontSize: "1.33em" }}>
                    {this.state.createdTimeString}
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Divider />
              <Grid.Row>
                <Grid.Column>
                  <Label as="a">Tags: </Label>
                  {this.state.tags.map(tag => tag)}
                </Grid.Column>
              </Grid.Row>
              <Divider />
              <Grid.Row>
                <Grid.Column>
                  <EditIcon artifactId={this.state.artifactId} />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid stretched centered={true}>
          <Grid.Column width={9}>
            <Comments artifactId={this.state.artifactId} />
          </Grid.Column>
        </Grid>
      </Segment>
    ) : (
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          alignItems: "center",
          width: "100%",
          height: "80vh"
        }}
      >
        <Message icon style={{ height: 200, width: 300 }} color="red">
          <Message.Content>
            <Message.Header>Oh no...</Message.Header>
            We couldn't find this artifact.
          </Message.Content>
        </Message>
      </div>
    )
  }
}

export default withFirebase(ArtifactPage)

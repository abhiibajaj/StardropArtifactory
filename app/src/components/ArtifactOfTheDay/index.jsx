import React from "react"
import withFirebase from "../../contexts/withFirebase"
import { Card, Image, Grid, Header, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

const getCurrentDate = () => {
  const date = new Date()
  return date
}

class ArtifactOfTheDay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: getCurrentDate(),
      artifactId: "",
      displayImage: null,
      createdTimeString: "",
      data: {},
      artifactExists: false,
      isLoading: true
    }
  }

  componentDidMount() {
    this.fetchArtifact()
  }

  fetchArtifact = async () => {
    const month = this.state.date.getMonth() + 1 // getMonth returns month 0indexed
    const day = this.state.date.getDate()

    let artifacts = this.props.firebase.db
      .collection("artifacts")
      .where("month", "==", month)
      .where("day", "==", day)
      .limit(1)

    console.log(day)
    console.log(typeof month)
    try {
      const querySnapshot = await artifacts.get()
      if (querySnapshot.empty) {
        this.setState({
          artifactExists: false,
          isLoading: false,
          displayImage: this.noArtifactFound()
        })
        console.log("didnt find anything")
        return
      }
      querySnapshot.forEach(artifactDoc => {
        console.log(artifactDoc.data())
        this.setState({
          artifactId: artifactDoc.id,
          data: artifactDoc.data(),
          artifactExists: true,
          isLoading: false,
          createdTimeString: new Date(
            artifactDoc.data().createdTime.seconds * 1000
          ).toDateString(),
          displayImage: this.getDisplayImageForFileType(
            artifactDoc.data().imageTypes[0],
            artifactDoc.data().image[0]
          )
        })
      })
    } catch (e) {
      console.log("Error getting document:", e)
    }
  }

  noArtifactFound = () => {
    return (
      <Grid
        centered={true}
        verticalAlign="bottom"
        style={{ padding: "5em 2em", height: "300px", width: "300px" }}
      >
        <Grid.Column>
          <Header as="h3" icon>
            <Icon name="image outline" size="huge" />
            No artifact was created on this day.
            <br />
            Let's add some!
          </Header>
        </Grid.Column>
      </Grid>
    )
  }

  getDisplayImageForFileType = (type, src) => {
    console.log(type)
    if (type.includes("image")) {
      return (
        <Image
          bordered
          rounded
          style={{ height: "300px", width: "300px", objectFit: "cover" }}
          variant="middle"
          src={src}
        />
      )
    }
    if (type.includes("pdf")) {
      return (
        <Grid
          centered={true}
          verticalAlign="bottom"
          style={{ padding: "5em 2em", height: "300px", width: "300px" }}
        >
          <Grid.Column>
            <Header as="h3" icon>
              <Icon name="file pdf outline" size="huge" />
              This artifact is a PDF document
            </Header>
          </Grid.Column>
        </Grid>
      )
    }
    if (type.includes("html")) {
      return (
        <Grid
          centered={true}
          verticalAlign="bottom"
          style={{ padding: "5em 2em", height: "300px", width: "300px" }}
        >
          <Grid.Column>
            <Header as="h3" icon>
              <Icon name="file code outline" size="huge" />
              This artifact is a html file.
            </Header>
          </Grid.Column>
        </Grid>
      )
    }
    return (
      <Grid
        centered={true}
        verticalAlign="bottom"
        style={{ padding: "5em 2em", height: "200px", width: "200px" }}
      >
        <Grid.Column>
          <Header as="h3" icon>
            <Icon name="exclamation circle" size="huge" />
            This artifact is of unknown type
          </Header>
        </Grid.Column>
      </Grid>
    )
  }

  render() {
    return (
      <div>
        <Link to={`/artifact/` + this.state.artifactId}>
          <Card>
            <Card.Content>
              <Card.Header>Artifact of The Day</Card.Header>
              <Card.Description>
                {this.state.date.toDateString()}
              </Card.Description>
            </Card.Content>
            {this.state.displayImage}
            <Card.Content>
              <Card.Description>{this.state.data.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>Click to view more</Card.Content>
          </Card>
        </Link>
      </div>
    )
  }
}

export default withFirebase(ArtifactOfTheDay)

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
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          alignItems: "center",
          height: "300px",
          width: "290px"
        }}
      >
        <Header as="h3" icon>
          <Icon name="file code outline" size="huge" />
          No artifact was created on this day.
          <br />
          Let's add some!
        </Header>
      </div>
    )
  }

  getDisplayImageForFileType = (type, src) => {
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
        <embed
          src={src}
          style={{
            height: "300px",
            width: "300px"
          }}
        ></embed>
      )
    }
    if (type.includes("html")) {
      return (
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
            height: "300px",
            width: "300px"
          }}
        >
          <Header as="h3" icon>
            <Icon name="file code outline" size="huge" />
            This artifact is a html file.
          </Header>
        </div>
      )
    }
    if (type.includes("video")) {
      return (
        <video
          style={{
            height: "300px",
            width: "290px"
          }}
          controls
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/webm" />
          <source src={src} type="video/ogg" />
          Your browser does not allow preview of this video!
        </video>
      )
    }
    if (type.includes("audio")) {
      return (
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
            height: "300px",
            width: "300px"
          }}
        >
          <Header style={{ marginTop: "3rem" }} as="h3" icon>
            <Icon name="file audio outline" size="huge" />
            Audio File
          </Header>
          <audio
            style={{
              height: "80%",
              width: "90%"
            }}
            controls
          >
            <source src={src} type="audio/ogg" />
            <source src={src} type="audio/mpeg" />
            <source src={src} type="audio/wav" />
            Your browser does not allow preview of this audio!
          </audio>
        </div>
      )
    }
    return (
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          alignItems: "center",
          height: "300px",
          width: "300px"
        }}
      >
        <Header as="h3" icon>
          <Icon name="exclamation circle" size="huge" />
          This artifact is of unknown type
        </Header>
      </div>
    )
  }

  linkWrapper = children => {
    if (this.state.artifactId) {
      return <Link to={`/artifact/` + this.state.artifactId}>{children()}</Link>
    } else {
      return <Link to={`/addartifact`}>{children()}</Link>
    }
  }

  render() {
    return (
      <div
        style={{
          height: "300px",
          width: "300px",
          marginRight: "5rem",
          position: "fixed",
          top: "130px",
          right: "-40px"
        }}
      >
        {this.linkWrapper(() => (
          <Card>
            <Card.Content>
              <Card.Header>Artifact of The Day</Card.Header>
              <Card.Description>
                {this.state.date.toDateString()}
              </Card.Description>
            </Card.Content>
            {this.state.displayImage}
            <Card.Content>
              <Card.Header>{this.state.data.title}</Card.Header>
              <Card.Description>{this.state.data.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>Click to view more</Card.Content>
          </Card>
        ))}
      </div>
    )
  }
}

export default withFirebase(ArtifactOfTheDay)

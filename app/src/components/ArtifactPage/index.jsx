import React from "react"
import withFirebase from "../../contexts/withFirebase"
import Card from "react-bootstrap/Card"
import RightArrow from "./RightArrow"
import LeftArrow from "./LeftArrow"
import Spinner from "./Spinner"
import EditIcon from "./EditIcon"
import Comments from "./Comments"

class ArtifactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artifactId: this.props.match.params.artifactId,
      data: {},
      isLoading: true,
      artifactExists: false,
      images: [],
      imageIndex: 0
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
        this.setState({ isLoading: false })
        return
      }
      this.setState({ artifactExists: true })
      console.log(artifactDoc.data())
      // speed opt here: download image first
      this.setState({
        data: artifactDoc.data(),
        images: artifactDoc.data().image,
        isLoading: false
      })
    } catch (e) {
      console.log("Error getting document:", e)
    }
  }

  goToPrevSlide = () => {
    if (this.state.imageIndex === 0) {
      return this.setState({ imageIndex: this.state.images.length - 1 })
    }
    this.setState({ imageIndex: this.state.imageIndex - 1 })
  }

  goToNextSlide = () => {
    if (this.state.imageIndex === this.state.images.length - 1) {
      return this.setState({ imageIndex: 0 })
    }
    this.setState({ imageIndex: this.state.imageIndex + 1 })
  }

  buildSlide = () => {
    return (
      <div className="slider" style={{ display: "flex" }}>
        <LeftArrow goToPrevSlide={this.goToPrevSlide} />
        <div className="slide">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={this.state.images[this.state.imageIndex]}
              alt="missing"
            />
            <Card.Body>
              <Card.Title>{this.state.data.description}</Card.Title>
              <Card.Text>
                Created by {this.state.data.ownerId} <br />
                Related to {this.state.data.relatedFamilyMembers}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <RightArrow goToNextSlide={this.goToNextSlide} />
        <EditIcon artifactId={this.state.artifactId} />
        {this.displayComments()}
      </div>
    )
  }

  displayComments = () => {
    return (
      <div>
        <Comments artifactId={this.state.artifactId} />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <Spinner />}
        {this.state.artifactExists &&
          !this.state.isLoading &&
          this.buildSlide()}
        {!this.state.artifactExists && !this.state.isLoading && (
          <div>The artifact does not exsit. </div>
        )}
      </div>
    )
  }
}

export default withFirebase(ArtifactPage)

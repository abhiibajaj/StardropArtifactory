import React from "react"
import withFirebase from "../../contexts/withFirebase"
import EditForm from "./EditForm"

class EditPage extends React.Component {
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

    let imageRefUrls = []
    try {
      const artifactDoc = await artifact.get()
      if (!artifactDoc.exists) {
        this.setState({ isLoading: false })
        return
      }
      this.setState({ artifactExists: true })
      console.log(artifactDoc.data())
      imageRefUrls = artifactDoc.data().image
      console.log(imageRefUrls)
      this.setState({ data: artifactDoc.data() })

      imageRefUrls.forEach(async refUrl => {
        let imageRef = this.props.firebase.storage.refFromURL(refUrl)
        const url = await imageRef.getDownloadURL()
        let images = this.state.images
        images.push(url)
        this.setState({ images: images, isLoading: false })
      })
    } catch (e) {
      console.log("Error getting document:", e)
    }
  }

  buildEditForm = () => {
    return (
      <div className="slider" style={{ display: "flex" }}>
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
      <div>
        Editing {this.state.artifactId}
        {this.state.isLoading && <div>Loading...</div>}
        {this.state.artifactExists &&
          !this.state.isLoading &&
          this.buildEditForm()}
        {!this.state.artifactExists && !this.state.isLoading && (
          <div>The artifact does not exsit. </div>
        )}
      </div>
    )
  }
}

export default withFirebase(EditPage)

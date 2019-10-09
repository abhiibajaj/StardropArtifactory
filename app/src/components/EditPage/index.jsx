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

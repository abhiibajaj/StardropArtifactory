import React from "react"
import withFirebase from "../../contexts/withFirebase"

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    this.getAllArtifacts()
  }

  getAllArtifacts = async () => {
    const db = this.props.firebase.db
    const artifacts = db.collection("artifacts")
    let allImageUrls = []

    try {
      const querySnapshot = await artifacts.get()
      querySnapshot.forEach(doc => {
        allImageUrls = [...allImageUrls, ...doc.data().image]
      })
    } catch (e) {
      console.log("Error getting document:", e)
    }
    this.setState({
      images: allImageUrls
    })
  }

  render() {
    return (
      <div>
        {[...this.state.images].map((image, index) => {
          console.log(image)
          console.log(index)
          return (
            <img key={index} height='250' width='250' alt='' src={image}></img>
          )
        })}
      </div>
    )
    //return <button onClick={this.getAllArtifacts}>Hello Auth Page</button>;
  }
}

export default withFirebase(HomePage)

import React from 'react'
import withFirebase from '../../contexts/withFirebase'

class EditPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artifactId: this.props.match.params.artifactId,
            data: {},
            isLoading: true,
            artifactExists: false,
            images: [],
            imageIndex: 0,
        }
    }
    componentDidMount() {
        this.fetchArtifact()
    }

    fetchArtifact = async () => {
        const artifactId = this.state.artifactId
        console.log("getting artifact with id: " + artifactId)
        let artifact = this.props.firebase.db.collection('artifacts').doc(artifactId)

        let imageRefUrls = []
        try {
            const artifactDoc = await artifact.get()
            if (!artifactDoc.exists) {
                this.setState( {isLoading: false} )
                return
            }
            this.setState( {artifactExists: true} )
            console.log(artifactDoc.data())
            imageRefUrls = artifactDoc.data().image
            console.log(imageRefUrls)
            this.setState({ data : artifactDoc.data()})
            
            imageRefUrls.forEach(async (refUrl) => {
                let imageRef = this.props.firebase.storage.refFromURL(refUrl)
                const url = await imageRef.getDownloadURL()
                let images = this.state.images
                images.push(url)
                this.setState( {images: images, isLoading: false} )
            })

        } catch (e) {
            console.log("Error getting document:", e);
        }
    }

    goToPrevSlide = () => {
        if(this.state.imageIndex === 0) {
            return this.setState( {imageIndex: this.state.images.length-1} )
        }
        this.setState({imageIndex: this.state.imageIndex - 1 })
    }
    
    goToNextSlide = () => {
        if(this.state.imageIndex === this.state.images.length - 1) {
          return this.setState( {imageIndex: 0} )
        }
        this.setState({imageIndex: this.state.imageIndex + 1 })
    }

    buildSlide = () => {
        return <div className="slider" style={{display: 'flex'}}>
                {this.state.data}
              </div>
    }

    render() {

        return (
            <div>
                Edting {this.state.artifactId}
                {this.state.isLoading && <div>Loading...</div>}
                {this.state.artifactExists && !this.state.isLoading && this.buildSlide()}
                {!this.state.artifactExists && !this.state.isLoading && <div>The artifact does not exsit. </div>}
            </div>
        )
    }
}

export default withFirebase(EditPage)
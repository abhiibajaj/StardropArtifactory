import React from 'react'
import withFirebase from '../../contexts/withFirebase'
import Card from 'react-bootstrap/Card'
import RightArrow from './RightArrow'
import LeftArrow from './LeftArrow'

class ArtifactPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artifactId: this.props.match.params.artifactId,
            data: {},
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
                return
            }
            this.setState({artifactExists: true})
            console.log(artifactDoc.data())
            imageRefUrls = artifactDoc.data().image
            console.log(imageRefUrls)
            this.setState({ data : artifactDoc.data()})
            
            imageRefUrls.forEach(async (refUrl) => {
                let imageRef = this.props.firebase.storage.refFromURL(refUrl)
                const url = await imageRef.getDownloadURL()
                let images = this.state.images
                images.push(url)
                this.setState( {images: images} )
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

    slideWidth = () => {
        return document.querySelector('.slide').clientWidth
     }
    
    render() {
        return (
            <div>
                <div className="slider" style={{display: 'flex'}}>
                    <LeftArrow goToPrevSlide={this.goToPrevSlide} />
                    <div className="slide">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={this.state.images[this.state.imageIndex]} alt="missing" />
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
                </div>
            </div>
        )
    }
}

export default withFirebase(ArtifactPage);
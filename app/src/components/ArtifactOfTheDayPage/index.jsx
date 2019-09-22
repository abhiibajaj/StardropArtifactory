import React from 'react'
import withFirebase from '../../contexts/withFirebase'
import Card from 'react-bootstrap/Card'

const getCurrentDate = () => {
    const date = new Date();
    date.setHours(0,0,0,0);
    return date;
}

class ArtifactOfTheDay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: getCurrentDate(),
            hasImage: false,
            imageUrl: "",
            data: {},
        }
    }
    
    componentDidMount() {
        this.getArtifact()
    }

    getArtifact = async () => {
        const today = this.state.date
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
        let artifacts = this.props.firebase.db.collection('artifacts')
        .where('date', '>=', today)
        .where('date', '<', tomorrow)
        .limit(1)
        console.log(today)
        console.log(tomorrow)
        let imageRefUrl = ""
        try {
            const querySnapshot = await artifacts.get()
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                imageRefUrl = doc.data().image
                console.log(imageRefUrl)
                this.setState({ data : doc.data()})
            })

        } catch (e) {
            console.log("Error getting document:", e);
        }

        //get url of image
        let imageRef = this.props.firebase.storage.refFromURL(imageRefUrl)
        imageRef.getDownloadURL().then((url) => {
            this.setState({ imageUrl : url})
          }).catch(function(error) {
            console.log("Error getting image download url", error)
          });
    }
    render() {
        return (
            <div>
                <div> Today is {this.state.date.toDateString()} </div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.state.imageUrl} alt={require('./test.png')} />
                    <Card.Body>
                        <Card.Title>{this.state.data.description}</Card.Title>
                        <Card.Text>
                            Created by {this.state.data.ownerId} <br />
                            Related to {this.state.data.relatedFamilyMembers}
                        </Card.Text>
                </Card.Body>
                </Card>
            </div>
        )
    }
}

export default withFirebase(ArtifactOfTheDay);
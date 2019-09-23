import React from 'react'
import withFirebase from '../../contexts/withFirebase'
import Card from 'react-bootstrap/Card'

const getCurrentDate = () => {
    const date = new Date();
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
        const month = this.state.date.getMonth() + 1 // getMonth returns month 0indexed
        const day = this.state.date.getDate()

        console.log(month)
        console.log(day)
        let artifacts = this.props.firebase.db.collection('artifacts')
        .where('month', '==', month)
        .where('day', '==', day)
        .limit(1)

        let imageRefUrl = ""
        try {
            const querySnapshot = await artifacts.get()
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                imageRefUrl = doc.data().image
                console.log(imageRefUrl)
                this.setState({ data : doc.data()})
            })
  
            //get url of image
            let imageRef = this.props.firebase.storage.refFromURL(imageRefUrl)
            const url = await imageRef.getDownloadURL()
            this.setState({ imageUrl : url})

        } catch (e) {
            console.log("Error getting document:", e);
        }

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
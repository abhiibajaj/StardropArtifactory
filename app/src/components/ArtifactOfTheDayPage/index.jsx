import React from 'react'
import FirebaseContext from '../../contexts/FirebaseContext';
import withFirebase from '../../contexts/withFirebase'

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
        try {
            const querySnapshot = await artifacts.get()
            querySnapshot.forEach((doc) => {
                this.setState({ data : doc.data()})
                console.log(doc.data())
            })

        } catch (e) {
            console.log("Error getting document:", e);
        }
    }
    render() {
        return (
            <div>
                <div> Today is {this.state.date.toDateString()} </div>
                Inside firebase
                <div> Artifact: {JSON.stringify(this.state.data)} </div>
                <img key = "test" src={require('./test.png')} alt="" />
            </div>
        )
    }
}

export default withFirebase(ArtifactOfTheDay);
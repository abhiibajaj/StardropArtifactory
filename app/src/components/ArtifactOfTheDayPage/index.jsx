import React from 'react'
import FirebaseContext from '../../contexts/FirebaseContext';

const getCurrentDate = () => {
    const date = new Date();
    return date.toDateString();
}

class ArtifactOfTheDay extends React.Component {
  render() {
    return (
    <div>
        <div> Today is {getCurrentDate()} </div>
        <FirebaseContext.Consumer>
            {
              firebase => <DisplayImageOnDate firebase={firebase} />
            }
        </FirebaseContext.Consumer>
    </div>

    )
  }
}

class DisplayImageOnDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            hasImage: false,
            artifact: null,
        }
    }
    
    getArtifact = () => {
        this.setState({artifact: this.props.db.collection("artifacts").doc("L5AkgsaL78dE5OCylA5y")});
        this.artifact.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    render() {
        return (
            <div>
                Inside firebase
                {this.getArtifact()}
                <img src={require('./test.png')} />
            </div>
        )
    }
}

export default ArtifactOfTheDay;
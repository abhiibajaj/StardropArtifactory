import React from "react";
import withFirebase from "../../contexts/withFirebase";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allImages: []
        };
    }

    getAllArtifacts = e => {
        const db = this.props.firebase.db;
        const artifacts = db.collection("artifacts");

        artifacts
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.setState({
                        allImages: [
                            {
                                url: doc.data().description
                            }
                        ]
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return <button onClick={this.getAllArtifacts}>Hello Auth Page</button>;
    }
}

export default withFirebase(HomePage);

import React from "react";
import withFirebase from "../../contexts/withFirebase";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allImages: []
        };
    }

    componentDidMount() {
        this.getAllArtifacts();
    }

    getAllArtifacts = async () => {
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
                            },
                            ...this.state.allImages
                        ]
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
        console.log(this.state);
    };

    render() {
        return <button onClick={this.getAllArtifacts}>Hello Auth Page</button>;
    }
}

export default withFirebase(HomePage);

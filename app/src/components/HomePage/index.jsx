import React from "react";
import withFirebase from "../../contexts/withFirebase";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        this.getAllArtifacts();
    }

    getAllArtifacts = async () => {
        const db = this.props.firebase.db;
        const artifacts = db.collection("artifacts");
        const allImageUrls = [];

        try {
            const querySnapshot = await artifacts.get();
            querySnapshot.forEach(doc => {
                allImageUrls.push(doc.data().image);
            });
        } catch (e) {
            console.log("Error getting document:", e);
        }
        console.log(allImageUrls);

        allImageUrls.forEach(imageRefUrl => {
            const imageRef = this.props.firebase.storage.refFromURL(
                imageRefUrl
            );
            imageRef
                .getDownloadURL()
                .then(url => {
                    this.setState(state => {
                        const images = state.images.concat(url);
                        return {
                            images
                        };
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
        console.log(this.state);
    };

    render() {
        return <button onClick={this.getAllArtifacts}>Hello Auth Page</button>;
    }
}

export default withFirebase(HomePage);

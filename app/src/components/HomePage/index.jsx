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
    };

    render() {
        return <button onClick={this.getAllArtifacts}>Hello Auth Page</button>;
    }
}

export default withFirebase(HomePage);

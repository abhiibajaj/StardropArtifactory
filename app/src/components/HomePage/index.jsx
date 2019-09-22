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
        this.getImageUrl();
    }

    getImageUrl = async imageRefUrl => {
        try {
            const imageRef = this.props.firebase.storage.refFromURL(
                imageRefUrl
            );
            const imageUrl = await imageRef.getDownloadURL();
            this.setState(state => {
                const images = state.images.concat(imageUrl);
                return {
                    images
                };
            });
        } catch (error) {
            console.log(error);
        }
    };
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
        allImageUrls.forEach(imageRefUrl => {
            this.getImageUrl(imageRefUrl);
        });
    };

    render() {
        return (
            <div>
                {[...this.state.images].map((image, index) => {
                    console.log(image);
                    console.log(index);
                    return (
                        <img
                            key={index}
                            height="250"
                            width="250"
                            alt=""
                            src={image}
                        ></img>
                    );
                })}
            </div>
        );
        //return <button onClick={this.getAllArtifacts}>Hello Auth Page</button>;
    }
}

export default withFirebase(HomePage);

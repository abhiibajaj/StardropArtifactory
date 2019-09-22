import React from "react";
import withFirebase from "../../contexts/withFirebase";
import Button from "react-bootstrap/Button";

const getCurrentDate = () => {
    const date = new Date();
    return date;
};
class AddArtifactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: ""
        };
    }

    handleUpload = e => {
        const { image } = this.state;
        const firebase = this.props.firebase;
        const uploadTask = firebase.storage
            .ref(`images/${image.name}`)
            .put(image);

        const db = firebase.db;

        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                firebase.storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("artifacts").add({
                            date: getCurrentDate(),
                            description: "???",
                            image:
                                "gs://stardrop-e5f01.appspot.com/" + image.name
                        });
                    });
            }
        );
    };

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({
                image
            }));
        }
    };
    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange}></input>
                <Button onClick={this.handleUpload} variant="primary">
                    Image upload
                </Button>
            </div>
        );
    }
}

export default withFirebase(AddArtifactPage);

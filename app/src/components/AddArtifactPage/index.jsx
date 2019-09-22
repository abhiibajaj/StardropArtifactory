import React from "react";
import withFirebase from "../../contexts/withFirebase";
import Button from "react-bootstrap/Button";

class AddArtifactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: ""
        };
    }

    handleUpload = e => {
        const image = this.state;
        const firebase = this.props.firebase;
        const uploadTask = firebase.storage
            .ref(`images/${image.name}`)
            .put(image);
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

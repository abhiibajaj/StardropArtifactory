import React from "react";
import withFirebase from "../../contexts/withFirebase";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

const getCurrentDate = () => {
    const date = new Date();
    return date;
};
class AddArtifactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: "",
            redirect: false
        };
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        });
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/home" />;
        }
    };

    renderButton = () => {
        if (this.state.image) {
            return (
                <Button onClick={this.handleUpload} variant="primary">
                    Image upload
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={this.handleUpload}
                    variant="secondary"
                    disabled
                >
                    Image upload
                </Button>
            );
        }
    };

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
                                "gs://stardrop-e5f01.appspot.com/images/" +
                                image.name
                        });
                        this.setRedirect();
                        console.log(this.state);
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
                {this.renderRedirect()}
                <input type="file" onChange={this.handleChange}></input>
                {this.renderButton()}
            </div>
        );
    }
}

export default withFirebase(AddArtifactPage);

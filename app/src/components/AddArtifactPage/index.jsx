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
            images: [],
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
        if (this.state.images.length > 0) {
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
        // const { image } = this.state.images;
        const firebase = this.props.firebase;
        const db = firebase.db;
        
        Object.keys(this.state.images).map((key) => {
            let image = this.state.images[key];
            console.log(this.state.images)
            console.log(key)
            console.log(image)
            let newRef = firebase.storage
                .ref(`images/${image.name}`)
                .put(image)
                .then((snapshot)=>{
                    let progress = snapshot.bytesTransferred / snapshot.totalBytes*100
                    console.log('Upload is ' + progress + '% done');
                    snapshot.ref
                    .getDownloadURL()
                    .then(url => {
                        db.collection("artifacts").add({
                            date: getCurrentDate(),
                            description: "???",
                            image:
                                "gs://stardrop-e5f01.appspot.com/images/" +
                                image.name
                        });
                        // console.log(this.state);
                    });
                });

        });
        this.setRedirect();
        console.log(this.state);
    };

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files;
            this.setState(() => ({
                images: image
            }));
        }
    };
    
    render() {
        return (
    
            <div>
                {this.renderRedirect()}
                <input type="file" multiple onChange={this.handleChange}></input>
                {this.renderButton()}
            </div>
        );
    }
}

export default withFirebase(AddArtifactPage);

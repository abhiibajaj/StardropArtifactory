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
                <Button variant="primary">Image upload</Button>
            </div>
        );
    }
}

export default withFirebase(AddArtifactPage);

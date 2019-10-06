import React from 'react'
import withFirebase from "../../contexts/withFirebase";

class SlideshowPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: null
        }
    }

    render() {
        return(
            <div>
                <h1>Slideshow Here</h1>
            </div>
        )
    }
}


export default withFirebase(SlideshowPage);

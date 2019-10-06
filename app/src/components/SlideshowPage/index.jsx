import React from 'react'
import withFirebase from "../../contexts/withFirebase";
import "./index.css"

class SlideshowPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: null
        }
    }

    render() {
        return(
            <ul class="slideshow">
                <li style={{backgroundImage: 'url("http://i.imgur.com/2LSMCmJ.jpg")'}}></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        )
    }
}


export default withFirebase(SlideshowPage);

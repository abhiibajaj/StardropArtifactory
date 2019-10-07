import React from 'react'
import withFirebase from "../../contexts/withFirebase";
import "./index.css"

class SlideshowPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images: [],
            randomNumbers: []
        }
    }

    renderSlideshow = () => {
        if(this.state.images.length < 5){
            return (
                <div><h1>Need at least 5 images for a slideshow!</h1></div>
            )
        } else {
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
    
    getRandomImages = async () => {
        const db = this.props.firebase.db;
        const artifacts = db.collection("artifacts");
        const allImageUrls = [];

        try {
            const querySnapshot = await artifacts.where('random', '>=', 19).limit(1).get();
            if(querySnapshot.size > 0){
                querySnapshot.forEach(doc => {
                    allImageUrls.push(doc.data().image);
                });
            } else {
                const querySnapshot = await artifacts.where('random', '<', 19).limit(1).get();
                querySnapshot.forEach(doc => {
                    allImageUrls.push(doc.data().image);
                });
            }
            
        } catch (e) {
            console.log("Error getting document:", e);
        }
        console.log(allImageUrls);
        // allImageUrls.forEach(imageRefUrl => {
        //     this.getImageUrl(imageRefUrl);
        // });
    };

    getRandomNumbers = () => {
        const countRef = this.props.firebase.db.collection("artifacts").doc("count");
        let randomNumbers = []
        countRef.get().then(count => {
            for(var i = 0;i<5;i++){
                let randomNumber = Math.floor(Math.random() * count.data().count);
                randomNumbers.push(randomNumber);
            }
        })
        this.setState({
            randomNumbers: randomNumbers
        })
    }
    componentDidMount(){
        this.getRandomNumbers();
        this.getRandomImages();
    }
    render() {
        return(
            this.renderSlideshow()
        )
    }
}


export default withFirebase(SlideshowPage);
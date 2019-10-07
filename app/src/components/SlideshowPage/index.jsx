import React from 'react'
import withFirebase from "../../contexts/withFirebase";
import "./index.css"

class SlideshowPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allImageUrls: [],
            randomNumbers: []
        }
    }

    renderSlideshow = () => {
        
        const style1 = {
            backgroundImage: `url(${this.state.allImageUrls[0]})`
        }
        const style2 = {
            backgroundImage: `url(${this.state.allImageUrls[1]})`
        }
        const style3 = {
            backgroundImage: `url(${this.state.allImageUrls[2]})`
        }
        const style4 = {
            backgroundImage: `url(${this.state.allImageUrls[3]})`
        }
        const style5 = {
            backgroundImage: `url(${this.state.allImageUrls[4]})`
        }
        return(
            <ul class="slideshow">
                <li style={style1}></li>
                <li style={style2}></li>
                <li style={style3}></li>
                <li style={style4}></li>
                <li style={style5}></li>
            </ul>
        )
    }

    getImageUrl = async imageRefUrl => {
        try {
            console.log(imageRefUrl)
            const imageRef = this.props.firebase.storage.refFromURL(imageRefUrl);
            const imageUrl = await imageRef.getDownloadURL();
            this.setState(state => {
                const allImageUrls = state.allImageUrls.concat(imageUrl);
                return {
                    allImageUrls
                };
            });
        } catch (error) {
            console.log(error);
        }
        console.log(this.state)
    };
    
    getRandomImages = async () => {
        const db = this.props.firebase.db;
        const artifacts = db.collection("artifacts");
        const allImageUrls = [];
        for (var i=0;i<5;i++){
            let randomNum = Math.floor(Math.random() * Math.floor(20));

            try {
                const querySnapshot = await artifacts.where('random', '>=', randomNum).limit(1).get();
                if(querySnapshot.size > 0){
                    querySnapshot.forEach(doc => {
                        allImageUrls.push(doc.data().image);
                    });
                } else {
                    const querySnapshot = await artifacts.where('random', '<', randomNum).limit(1).get();
                    querySnapshot.forEach(doc => {
                        allImageUrls.push(doc.data().image);
                    });
                }
                
            } catch (e) {
                console.log("Error getting document:", e);
            }
        }
        
        // this.setState({
        //     allImageUrls: allImageUrls
        // })
        allImageUrls.forEach(imageRefUrl => {
            this.getImageUrl(imageRefUrl);
        });
        console.log(this.state);
    };

    componentDidMount(){
        this.getRandomImages();
    }
    render() {
        return(
            this.renderSlideshow()
        )
    }
}


export default withFirebase(SlideshowPage);

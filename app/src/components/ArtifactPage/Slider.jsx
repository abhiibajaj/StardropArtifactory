import React from 'react'

class Slider extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {}
    }
  
    goToPrevSlide = () => {
    
    }
    
    goToNextSlide = () => {
      
    }

    render() {
      return (
        <div className="slider">
            <Slide />
            <LeftArrow goToPrevSlide={this.goToPrevSlide} />
            <RightArrow goToNextSlide={this.goToNextSlide} />      
        </div>
      );
    }
}

export default(Slider)
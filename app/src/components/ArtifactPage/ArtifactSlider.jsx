import React from "react"
import withFirebase from "../../contexts/withFirebase"
import { CarouselProvider, Slide, Slider, Dot } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import {
  Grid,
  Divider,
  Button,
  Header,
  Image,
  Placeholder,
  Icon
} from "semantic-ui-react"

class ArtifactSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  buildSliders = () => {
    if (this.props.isLoading) {
      return (
        <Slider style={{ maxWidth: "100%" }}>
          <Placeholder style={{ maxWidth: "100%" }}>
            <Placeholder.Image />
          </Placeholder>
        </Slider>
      )
    }
    let slides = []
    this.props.data.image.forEach((item, index) => {
      let slide = (
        <Slide index={index} key={index}>
          {this.getDisplayImageForFileType(
            this.props.data.imageTypes[index],
            item
          )}
        </Slide>
      )
      slides.push(slide)
    })
    return (
      <Slider style={{ maxWidth: "100%" }}>{slides.map(slide => slide)}</Slider>
    )
  }

  getDisplayImageForFileType = (type, src) => {
    if (type.includes("image")) {
      return (
        <Image
          bordered
          rounded
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain"
          }}
          variant="middle"
          src={src}
        />
      )
    }
    if (type.includes("pdf")) {
      return (
        <embed
          src={src}
          style={{
            height: "100%",
            width: "100%"
          }}
        ></embed>
      )
    }
    if (type.includes("video")) {
      return (
        <video
          style={{
            height: "100%",
            width: "100%"
          }}
          controls
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/webm" />
          <source src={src} type="video/ogg" />
          Your browser does not allow preview of this video!
        </video>
      )
    }
    if (type.includes("audio")) {
      return (
        <audio
          style={{
            height: "100%",
            width: "100%"
          }}
          controls
        >
          <source src={src} type="audio/ogg" />
          <source src={src} type="audio/mpeg" />
          <source src={src} type="audio/wav" />
          Your browser does not allow preview of this audio!
        </audio>
      )
    }
    if (type.includes("html")) {
      return (
        <a href={src}>
          <div
            style={{
              display: "grid",
              justifyItems: "center",
              alignItems: "center",
              height: "100%",
              width: "100%"
            }}
          >
            <Header as="h3" icon>
              <Icon name="file code outline" size="huge" />
              This artifact is a html file.
              <Header.Subheader>
                Please click on the icon to download the file.
              </Header.Subheader>
            </Header>
          </div>
        </a>
      )
    }
    return (
      <a href={src}>
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
            height: "100%",
            width: "100%"
          }}
        >
          <Header as="h3" icon>
            <Icon name="exclamation circle" size="huge" />
            This artifact is of unknown type
            <Header.Subheader>
              Please click on the icon to download the artifact.
            </Header.Subheader>
          </Header>
        </div>
      </a>
    )
  }
  render() {
    let slider = this.buildSliders()
    const len = this.props.artifactExists ? this.props.data.image.length : 0
    return (
      <CarouselProvider
        naturalSlideWidth={1.0}
        naturalSlideHeight={1.0}
        totalSlides={len}
        style={{
          maxWidth: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {slider}
        <Divider />
        <Button.Group size="mini" color="violet" fluid>
          {[...Array(len).keys()].map(slide => (
            <Button circular as={Dot} key={slide} icon="circle" slide={slide} />
          ))}
        </Button.Group>
      </CarouselProvider>
    )
  }
}

export default withFirebase(ArtifactSlider)

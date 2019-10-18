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
        <Slider>
          <Placeholder style={{ height: 400, width: 400 }}>
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
    return <Slider>{slides.map(slide => slide)}</Slider>
  }

  getDisplayImageForFileType = (type, src) => {
    if (type.includes("image")) {
      return (
        <Image
          bordered
          rounded
          style={{ height: "500px", width: "500px", objectFit: "cover" }}
          variant="middle"
          src={src}
        />
      )
    }
    if (type.includes("pdf")) {
      return (
        <a href={src}>
          <Grid
            centered={true}
            verticalAlign="bottom"
            style={{ padding: "10em 2em" }}
          >
            <Grid.Column>
              <Header as="h3" icon>
                <Icon name="file pdf outline" size="huge" />
                This artifact is a PDF document
                <Header.Subheader>
                  Please click on the icon to download the document.
                </Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid>
        </a>
      )
    }
    if (type.includes("html")) {
      return (
        <a href={src}>
          <Grid
            centered={true}
            verticalAlign="bottom"
            style={{ padding: "10em 3em" }}
          >
            <Grid.Column>
              <Header as="h3" icon>
                <Icon name="file code outline" size="huge" />
                This artifact is a html file.
                <Header.Subheader>
                  Please click on the icon to download the file.
                </Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid>
        </a>
      )
    }
    return (
      <a href={src}>
        <Grid
          centered={true}
          verticalAlign="bottom"
          style={{ padding: "10em 3em" }}
        >
          <Grid.Column>
            <Header as="h3" icon>
              <Icon name="exclamation circle" size="huge" />
              This artifact is of unknown type
              <Header.Subheader>
                Please click on the icon to download the artifact.
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid>
      </a>
    )
  }
  render() {
    let slider = this.buildSliders()
    const len = this.props.artifactExists ? this.props.data.image.length : 0
    return (
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={len}
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

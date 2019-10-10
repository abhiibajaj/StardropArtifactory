import React from "react"
import withFirebase from "../../contexts/withFirebase"
import {
  CarouselProvider,
  Image,
  Slide,
  Slider,
  Dot
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import {
  Segment,
  Grid,
  Item,
  Divider,
  Button,
  Container,
  Header
} from "semantic-ui-react"
import Spinner from "./Spinner"
import EditIcon from "./EditIcon"
import Comments from "./Comments"

class ArtifactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artifactId: this.props.match.params.artifactId,
      data: {},
      isLoading: true,
      artifactExists: false,
      images: [],
      imageTypes: [],
      imageIndex: 0,
      slides: []
    }
  }
  componentDidMount() {
    this.fetchArtifact()
  }

  fetchArtifact = async () => {
    const artifactId = this.state.artifactId
    console.log("getting artifact with id: " + artifactId)
    let artifact = this.props.firebase.db
      .collection("artifacts")
      .doc(artifactId)
    try {
      const artifactDoc = await artifact.get()
      if (!artifactDoc.exists) {
        this.setState({ artifactExists: false, isLoading: false })
        return
      }
      console.log(artifactDoc.data())
      this.setState({
        data: artifactDoc.data(),
        images: artifactDoc.data().image,
        imageTypes: artifactDoc.data().imageTypes,
        artifactExists: true,
        isLoading: false
      })
      this.buildSliders()
    } catch (e) {
      console.log("Error getting document:", e)
    }
  }

  buildSliders = () => {
    this.state.images.forEach((item, index) => {
      let slides = this.state.slides
      let slide = (
        <Slide index={index} key={index}>
          <Image hasMasterSpinner={true} src={item} />
        </Slide>
      )
      slides.push(slide)
      this.setState({ slides: slides })
    })
  }

  buildSlide = () => {
    return (
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={this.state.images.length}
      >
        <Slider>{this.state.slides.map(slide => slide)}</Slider>
        <Divider />
        <Container textAlign="center">
          <Button.Group>
            {[...Array(2).keys()].map(slide => (
              <Button as={Dot} key={slide} icon="circle" slide={slide} />
            ))}
          </Button.Group>
        </Container>
      </CarouselProvider>
    )
  }

  render() {
    return (
      <Grid centered={true}>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header
              textAlign="center"
              color="violet"
              as="h3"
              style={{ fontSize: "2em" }}
            >
              {this.state.data.title}
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            {this.state.isLoading && <Spinner />}
            {this.state.artifactExists &&
              !this.state.isLoading &&
              this.buildSlide()}
            {!this.state.artifactExists && !this.state.isLoading && (
              <div>The artifact does not exsit. </div>
            )}
            <EditIcon artifactId={this.state.artifactId} />
          </Grid.Column>

          <Grid.Column width={4}>
            <Grid.Row columns={1}>
              <p style={{ fontSize: "1.33em" }}>
                {this.state.data.description}
              </p>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Comments artifactId={this.state.artifactId} />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default withFirebase(ArtifactPage)

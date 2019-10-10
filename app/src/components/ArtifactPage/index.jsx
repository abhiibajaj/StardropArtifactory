import React from "react"
import withFirebase from "../../contexts/withFirebase"
import { CarouselProvider, Slide, Slider, Dot } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import {
  Segment,
  Grid,
  Divider,
  Button,
  Header,
  Label,
  Image
} from "semantic-ui-react"
import Spinner from "./Spinner"
import EditIcon from "./EditIcon"
import Comments from "./Comments"

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

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
      slides: [],
      tags: [],
      createdTimeString: ""
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
        isLoading: false,
        createdTimeString: new Date(
          artifactDoc.data().createdTime.seconds * 1000
        ).toDateString()
      })
      this.buildTags()
      this.buildSliders()
    } catch (e) {
      console.log("Error getting document:", e)
    }
  }

  buildTags = () => {
    let allTags = this.state.data.tags.filter(unique)
    allTags.forEach((tag, index) => {
      let tags = this.state.tags
      let label = (
        <Label as="a" tag key={index}>
          {tag}
        </Label>
      )
      tags.push(label)
      this.setState({ tags: tags })
    })
  }

  buildSliders = () => {
    this.state.images.forEach((item, index) => {
      let slides = this.state.slides
      let slide = (
        <Slide index={index} key={index}>
          <Image
            bordered
            rounded
            style={{ height: "500px", width: "500px", objectFit: "cover" }}
            variant="middle"
            src={item}
          />
          {/* <Image hasMasterSpinner={true} src={item} /> */}
        </Slide>
      )
      slides.push(slide)
      this.setState({ slides: slides })
    })
  }

  buildSlide = () => {
    const len = this.state.images.length
    return (
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={len}
      >
        <Slider>{this.state.slides.map(slide => slide)}</Slider>
        <Divider />
        <Button.Group size="mini" color="violet" fluid>
          {[...Array(len).keys()].map(slide => (
            <Button circular as={Dot} key={slide} icon="circle" slide={slide} />
          ))}
        </Button.Group>
      </CarouselProvider>
    )
  }

  render() {
    return (
      <Segment vertical>
        <Grid centered={true} style={{ padding: "2em 0em" }}>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Header color="violet" as="h1" style={{ fontSize: "2em" }}>
                {this.state.data.title}
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={5}>
              {this.state.isLoading && <Spinner />}
              {this.state.artifactExists &&
                !this.state.isLoading &&
                this.buildSlide()}
              {!this.state.artifactExists && !this.state.isLoading && (
                <div>The artifact does not exsit. </div>
              )}
            </Grid.Column>

            <Grid.Column width={4}>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Header as="h3">Description</Header>
                  <p style={{ fontSize: "1.33em" }}>
                    {this.state.data.description}
                  </p>
                  <Header as="h3">Date of Origin</Header>
                  <p style={{ fontSize: "1.33em" }}>
                    {this.state.createdTimeString}
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Divider />
              <Grid.Row>
                <Grid.Column>
                  <Label as="a">Tags: </Label>
                  {this.state.tags.map(tag => tag)}
                </Grid.Column>
              </Grid.Row>
              <Divider />
              <Grid.Row>
                <Grid.Column>
                  <EditIcon artifactId={this.state.artifactId} />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid stretched centered={true}>
          <Grid.Column width={9}>
            <Comments artifactId={this.state.artifactId} />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default withFirebase(ArtifactPage)

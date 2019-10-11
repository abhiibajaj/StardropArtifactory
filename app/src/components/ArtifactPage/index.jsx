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
  Image,
  Placeholder,
  Icon,
  Message
} from "semantic-ui-react"
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
        <Label as="a" tag key={index} size="mini">
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
          {this.getDisplayImageForFileType(this.state.imageTypes[index], item)}
        </Slide>
      )
      slides.push(slide)
      this.setState({ slides: slides })
    })
  }

  getDisplayImageForFileType = (type, src) => {
    console.log(type)
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

  buildSlide = () => {
    let slider = null
    if (this.state.isLoading) {
      slider = (
        <Slider>
          <Placeholder style={{ height: 400, width: 400 }}>
            <Placeholder.Image />
          </Placeholder>
        </Slider>
      )
    } else if (!this.state.artifactExists) {
      slider = (
        <Slider>
          <Message icon style={{ height: 200, width: 300 }} color="red">
            <Message.Content>
              <Message.Header>Oh no...</Message.Header>
              We couldn't find this artifact.
            </Message.Content>
          </Message>
        </Slider>
      )
    } else {
      slider = <Slider>{this.state.slides.map(slide => slide)}</Slider>
    }
    const len = this.state.images.length
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

  render() {
    return (
      <Segment vertical>
        <Grid
          centered={true}
          verticalAlign="bottom"
          style={{ padding: "2em 0em" }}
        >
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Header color="violet" as="h1" style={{ fontSize: "2em" }}>
                {this.state.data.title}
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={5}>{this.buildSlide()}</Grid.Column>

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

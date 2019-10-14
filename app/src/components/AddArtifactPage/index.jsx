import React from "react"
import withFirebase from "../../contexts/withFirebase"
import { Form, Button, Label, Segment, Grid, Header } from "semantic-ui-react"
import { Redirect } from "react-router-dom"
import Calendar from "../Calendar"
import ArtifactSlider from "../ArtifactPage/ArtifactSlider"
import "react-datepicker/dist/react-datepicker.css"

const getCurrentDate = () => new Date()

class AddArtifactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: [],
      url: "",
      title: "",
      description: "",
      tags: "",
      createDate: getCurrentDate(),
      day: getCurrentDate().getDay(),
      random: null,
      month: getCurrentDate().getMonth() + 1,
      redirect: false,
      previewImages: [],
      user: null,
      loading: false,
      createdId: "",
      relativeUrl: []
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/artifact/${this.state.createdId}`} />
    }
  }

  renderButton = () => {
    if (this.state.image.length > 0 && this.state.title.length > 0) {
      return (
        <Button onClick={this.handleUpload} color='violet'>
          Upload
        </Button>
      )
    } else {
      return (
        <Button onClick={this.handleUpload} secondary disabled>
          Upload
        </Button>
      )
    }
  }

  handleUpload = e => {
    this.setState({ loading: true })
    // const { image } = this.state.images;
    const firebase = this.props.firebase
    const db = firebase.db

    // for each image, upload images
    const imageUrls = Object.keys(this.state.image).map(key => {
      let image = this.state.image[key]
      return (
        firebase.storage
          .ref(`images/${image.name}`)
          .put(image)
          // get the urls
          .then(snapshot => snapshot.ref.getDownloadURL())
      )
    })
    // upload the db with array
    Promise.all(imageUrls)
      .then(listOfImageUrls => {
        const imageTypes = Object.keys(this.state.image).map(key => {
          return this.state.image[key].type
        })
        return db.collection("artifacts").add({
          date: getCurrentDate(),
          title: this.state.title,
          description: this.state.description,
          tags: this.state.tags.split(" "),
          createdTime: this.state.createDate,
          month: this.state.month,
          day: this.state.day,
          image: listOfImageUrls,
          imageTypes: imageTypes,
          random: Math.floor(Math.random() * Math.floor(10000))
        })
      })
      .then(doc => {
        // redirect to recipe on complete
        this.setState({ createdId: doc.id }, () => {
          this.setRedirect()
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  handleFileChange = e => {
    if (e.target.files[0]) {
      const images = e.target.files
      this.setState(
        {
          image: images
        },
        () => {
          Object.keys(this.state.image).map(key => {
            let image = this.state.image[key]
            let reader = new FileReader()
            console.log(image)
            reader.onloadend = () => {
              this.setState(state => {
                const previewImages = state.previewImages.concat(reader.result)
                return {
                  previewImages
                }
              })
            }
            reader.readAsDataURL(image)
            return null
          })
        }
      )
    }
  }
  handleInputChange = e => {
    let value = e.target.value
    let name = e.target.name
    this.setState({ [name]: value })
    console.log(this.state)
  }

  handleCalendar = createdDate => {
    this.setState(
      {
        createDate: createdDate,
        day: createdDate.getDate(),
        month: createdDate.getMonth() + 1
      },
      () => {
        console.log(this.state)
      }
    )
  }
  handleUpdateTag = e => {
    this.setState({
      tags: e.target.value.split(" ")
    })
    console.log(this.state)
  }

  renderArtifactSlider = () => {
    if (this.state.image.length > 100) {
      return (
        <ArtifactSlider
          data={this.state}
          isLoading={this.state.isLoading}
          artifactExists={true}
        />
      )
    } else {
      return (
        <ArtifactSlider
          data={this.state}
          isLoading={true}
          artifactExists={false}
        />
      )
    }
  }
  renderForm = () => {
    return (
      <Form size='large' loading={this.state.loading} widths='equal'>
        {this.renderRedirect()}
        <Form.Field>
          <label>Upload Artifact</label>
          <Label as='label' basic htmlFor='upload'>
            <Button
              icon='upload'
              label={{
                basic: true,
                content: "Select file(s)"
              }}
              rows='2'
              labelPosition='right'
            />
            <input
              hidden
              id='upload'
              multiple
              type='file'
              onChange={this.handleFileChange}
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <label>*Title</label>
          <textarea
            rows='2'
            type='text'
            name='title'
            placeholder='Title'
            onChange={this.handleInputChange}
          ></textarea>
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <textarea
            rows='3'
            type='text'
            name='description'
            placeholder='Describe your artifact!'
            onChange={this.handleInputChange}
          ></textarea>
        </Form.Field>

        <Form.Field>
          <label>Date of Origin</label>
          <Calendar handleCalendar={this.handleCalendar} ref='calendar' />
        </Form.Field>

        <Form.Field>
          <label>Tags (seperate with spaces)</label>
          <textarea
            rows='2'
            type='text'
            name='tags'
            placeholder='Put your tags here!'
            onChange={this.handleUpdateTag}
          ></textarea>
        </Form.Field>
        <div style={{ marginTop: "1rem" }}>{this.renderButton()}</div>
      </Form>
    )
  }

  render() {
    return (
      <Segment vertical>
        <Grid
          centered={true}
          verticalAlign='bottom'
          style={{ padding: "2em 0em" }}
        >
          <Grid.Row columns={1}>
            <Grid.Column textAlign='center'>
              <Header color='violet' as='h1' style={{ fontSize: "2em" }}>
                Adding Artifact
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={5}>{this.renderArtifactSlider()}</Grid.Column>

            <Grid.Column width={4}>
              <Grid.Column>
                {!this.state.isLoading && this.renderForm()}
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default withFirebase(AddArtifactPage)

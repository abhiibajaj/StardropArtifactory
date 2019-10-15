import React from "react"
import withFirebase from "../../contexts/withFirebase"
import { Form, Button, Segment } from "semantic-ui-react"
import { Redirect } from "react-router-dom"
import Calendar from "../Calendar"
import "react-datepicker/dist/react-datepicker.css"

const getCurrentDate = () => new Date()

class AddArtifactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
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
      createdId: ""
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
    if (this.state.images.length > 0 && this.state.title.length > 0) {
      return (
        <Button onClick={this.handleUpload} primary>
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
    const imageUrls = Object.keys(this.state.images).map(key => {
      let image = this.state.images[key]
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
        const imageTypes = Object.keys(this.state.images).map(key => {
          return this.state.images[key].type
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
          images: images
        },
        () => {
          Object.keys(this.state.images).map(key => {
            let image = this.state.images[key]
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

  removeImageByIndex = i => () => {
    console.log(i)
    let newImages = this.state.images
    delete newImages[0]
    console.log(newImages)

    this.setState({
      images: newImages,
      previewImages: this.state.previewImages.splice(i, 1)
    })
    console.log(this.state)
  }

  previewImages = () => {
    if (this.state.previewImages.length <= 0) {
      console.log("I NEED TO REMOVE")
      return <div></div>
    } else {
      console.log("HERE")
      return (
        <div>
          {[...this.state.previewImages].map((image, index) => {
            return (
              <div>
                <Button.Group attached='top'>
                  <Button onClick={this.removeImageByIndex(index)}>
                    Close
                  </Button>
                </Button.Group>
                <Segment attached>
                  <img
                    key={index}
                    height='250'
                    width='250'
                    alt=''
                    src={image}
                  ></img>
                </Segment>
              </div>
            )
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <div
        style={{
          margin: "1rem",
          display: "grid",
          width: "100%",
          justifyItems: "center",
          marginLeft: 0,
          marginTop: "2rem"
        }}
      >
        {this.previewImages()}

        <Form
          size='large'
          loading={this.state.loading}
          style={{ width: "80%" }}
        >
          {this.renderRedirect()}
          <Form.Input
            label='*Upload your Artifacts:'
            type='file'
            multiple
            onChange={this.handleFileChange}
          />

          <Form.Input
            name='title'
            onChange={this.handleInputChange}
            type='text'
            label='*Title:'
            placeholder='Title'
          />

          <Form.TextArea
            name='description'
            label='Descripton:'
            onChange={this.handleInputChange}
            placeholder='Description'
          />

          <Form.Input
            label='Tags:'
            name='tags'
            onChange={this.handleInputChange}
            type='text'
            placeholder='Tags! Separate with spaces'
          />
          <div>
            <h4>
              <b>Date of Origin:</b>
            </h4>
            <Calendar handleCalendar={this.handleCalendar} ref='calendar' />
          </div>
          <div style={{ marginTop: "1rem" }}>{this.renderButton()}</div>
        </Form>
      </div>
    )
  }
}

export default withFirebase(AddArtifactPage)

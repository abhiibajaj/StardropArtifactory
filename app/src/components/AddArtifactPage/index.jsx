import React from "react"
import withFirebase from "../../contexts/withFirebase"
import { Form, Button, Segment } from "semantic-ui-react"
import { Redirect } from "react-router-dom"
import withAuth from "../../contexts/withAuth"
import Calendar from "../Calendar"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./index.module.css"
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
      month: getCurrentDate().getMonth() + 1,
      random: null,
      redirect: false,
      previewImages: [],
      user: null,
      loading: false,
      imageTypeCount: 0,
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
          random: Math.floor(Math.random() * Math.floor(10000)),
          emailAddress: this.props.auth.data.email,
          imageTypeCount: this.state.imageTypeCount
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

  getAllImages = newImages => {}

  handleChange = e => {
    // convert FileList to Array
    const targetFiles = [...e.target.files]

    targetFiles.map(async (file, i) => {
      // get the preview from the file (works for images only)
      const preview = await this.fileReaderPromise(file)
      // append the file to files

      const images = [...this.state.images, file]
      // append the preview to previews
      const previewImages = [
        ...this.state.previewImages,
        { name: file.name, preview }
      ]

      this.setState({
        images,
        previewImages
      })
    })
  }

  fileReaderPromise = file => {
    // resolves to a base64 image
    return new Promise((resolve, reject) => {
      const r = new FileReader()
      // once loaded, resolve
      r.onload = e => resolve(e.target.result)
      // start the loading
      r.readAsDataURL(file)
    })
  }
  handleInputChange = e => {
    let value = e.target.value
    let name = e.target.name
    console.log(this.state)
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

  removeImageByName = (name, index) => () => {
    this.setState({
      images: this.state.images.filter(x => x.name !== name),
      previewImages: this.state.previewImages.filter(x => x.name !== name)
    })
  }

  previewImages = () => {
    if (this.state.previewImages.length <= 0) {
      return <div></div>
    } else {
      console.log("HERE")
      return (
        <div className={styles.fileContainer}>
          {[...this.state.images].map((image, index) => {
            return (
              <div className={styles.fileItem} key={image.name}>
                <Button.Group attached='top'>
                  <Button
                    className='ui icon button'
                    onClick={this.removeImageByName(image.name)}
                  >
                    <i className='close icon'></i>
                  </Button>
                </Button.Group>
                <Segment attached>{this.showPreview(index)}</Segment>
              </div>
            )
          })}
        </div>
      )
    }
  }

  showPreview = index => {
    let previewArtifact = this.state.previewImages[index].preview
    let type = previewArtifact.split(";")[0]
    let artifactSrc = this.state.previewImages[index].preview
    // console.log(previewArtifact)
    console.log(type[0])
    // console.log("NEED TO PREVIEW")
    if (type.includes("image") || type.includes("pdf")) {
      console.log("IMAGE OR PDF")
      return (
        <embed className={styles.filePreview} alt='' src={artifactSrc}></embed>
      )
    } else if (type.includes("video")) {
      console.log("UPLOADING VIDEO")
      return (
        <video className={styles.filePreview} controls>
          <source src={artifactSrc} type='video/mp4' />
          <source src={artifactSrc} type='video/webm' />
          <source src={artifactSrc} type='video/ogg' />
          Your browser does not allow preview of this video!
        </video>
      )
    } else if (type.includes("audio")) {
      console.log("Audio")
      return (
        <audio controls>
          <source src={artifactSrc} type='audio/ogg' />
          <source src={artifactSrc} type='audio/mpeg' />
          <source src={artifactSrc} type='audio/wav' />
          Your browser does not allow preview of this audio!
        </audio>
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
            onChange={this.handleChange}
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

export default withAuth(withFirebase(AddArtifactPage))

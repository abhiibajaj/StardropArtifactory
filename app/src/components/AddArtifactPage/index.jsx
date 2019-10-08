import React from "react"
import withFirebase from "../../contexts/withFirebase"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import { Redirect } from "react-router-dom"
import Calendar from "../Calendar"
import "react-datepicker/dist/react-datepicker.css"

const getCurrentDate = () => {
  const date = new Date()
  return date
}
class AddArtifactPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      url: "",
      description: "",
      createDate: null,
      day: null,
      month: null,
      redirect: false,
      preview: []
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
  }

  renderButton = () => {
    if (this.state.images.length > 0) {
      return (
        <Button onClick={this.handleUpload} variant='primary'>
          Upload
        </Button>
      )
    } else {
      return (
        <Button onClick={this.handleUpload} variant='secondary' disabled>
          Upload
        </Button>
      )
    }
  }

  handleUpload = e => {
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
    Promise.all(imageUrls).then(listOfImageUrls => {
      console.log(listOfImageUrls)
      db.collection("artifacts")
        .add({
          date: getCurrentDate(),
          description: this.state.description,
          createdTime: this.state.createDate,
          month: this.state.month,
          day: this.state.day,
          image: listOfImageUrls
        })
        .then(() => {
          // redirect on complete
          this.setRedirect()
        })
    })
    console.log(this.state)
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const images = e.target.files
      this.setState(() => ({
        images: images
      }))

      Object.keys(this.state.images).map(key => {
        let image = this.state.images[key]
        let reader = new FileReader()

        reader.onloadend = () => {
          this.setState(state => {
            const previewImages = state.previewImages.concat(reader.result)
            return {
              previewImages
            }
          })
        }
        reader.readAsDataURL(image)
      })
    }
  }

  handleForm = e => {
    const description = this.refs.description.value
    const createdDate = this.refs.calendar.state.startDate
    this.setState({
      description: description
    })
    if (createdDate) {
      this.setState({
        createDate: createdDate,
        day: createdDate.getDate(),
        month: createdDate.getMonth() + 1
      })
    }
  }

  render() {
    return (
      <Form>
        {this.renderRedirect()}

        <Form.Row>
          <Col sm={3}>
            <h6>Upload your Artifacts:</h6>
          </Col>
          <Col>
            <Form.Control type='file' multiple onChange={this.handleChange} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col sm={3}>
            <h6>Descripton:</h6>
          </Col>
          <Col>
            <Form.Control
              onChange={this.handleForm}
              ref='description'
              as='textarea'
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>Date of Origin</Col>
          <Col>
            <Calendar myfunc={this.handleForm} ref='calendar' />
          </Col>
        </Form.Row>
        <Form.Group>{this.renderButton()}</Form.Group>
      </Form>
    )
  }
}

export default withFirebase(AddArtifactPage)

import React from "react"
import { Button, Form } from "semantic-ui-react"
import { Redirect } from "react-router-dom"
import Calendar from "../Calendar"
import "react-datepicker/dist/react-datepicker.css"

class EditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      artifactData: props.artifactData,
      artifactId: props.artifactId,
      title: props.artifactData.title,
      description: props.artifactData.description,
      createdTime: new Date(props.artifactData.createdTime.seconds * 1000),
      day: props.artifactData.day,
      month: props.artifactData.month,
      tags: props.artifactData.tags,
      changesMade: false,
      errors: [],
      redirect: false
    }
  }

  handleFormSubmit = () => {
    if (!this.state.changesMade) {
      let errors = this.state.errors
      errors.push(<p>"No changes have been made"</p>)
      this.setState({ errors: errors })
      return
    }
    let artifact = this.props.firebase.db
      .collection("artifacts")
      .doc(this.state.artifactId)
    artifact.update({
      title: this.state.title,
      description: this.state.description,
      createdTime: this.state.createdTime,
      day: this.state.day,
      month: this.state.month,
      tags: this.state.tags
    })
    this.setState({ redirect: true })
    this.clearErrors()
  }

  handleUpdate = e => {
    let value = e.target.value
    let name = e.target.name
    this.setState({ [name]: value, changesMade: true })
    console.log(this.state)
  }

  handleUpdateDate = startDate => {
    console.log(startDate)
    this.setState({
      createdTime: startDate,
      day: startDate.getDate(),
      month: startDate.getMonth() + 1,
      changesMade: true
    })
  }

  handleUpdateTag = e => {
    this.setState({
      tags: e.target.value.split(" "),
      changesMade: true
    })
  }

  renderErrors = () => {
    if (this.state.errors.length === 0) {
      return
    }
    return this.state.errors[0]
  }

  clearErrors = () => {
    this.setState({ errors: [] })
  }

  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to={"/artifact/" + this.state.artifactId} />
    }
  }

  render() {
    return (
      <div>
        {this.redirect()}
        <Form onSubmit={this.handleFormSubmit} size="large">
          <Form.Field>
            <label>Title</label>
            <textarea
              rows="1"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleUpdate}
            ></textarea>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea
              rows="2"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleUpdate}
            ></textarea>
          </Form.Field>
          <Form.Field>
            <label>Date of Origin</label>
            <Calendar
              myfunc={this.handleUpdateDate}
              defaultValue={this.state.createdTime.toDateString()}
              ref="editCalendar"
            />
          </Form.Field>
          <Form.Field>
            <label>Tags</label>
            <textarea
              rows="2"
              type="text"
              name="tags"
              value={this.state.tags.join(" ")}
              onChange={this.handleUpdateTag}
            ></textarea>
          </Form.Field>
          {this.renderErrors()}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

export default EditForm

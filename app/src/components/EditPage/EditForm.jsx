import React from "react"
import { Button, Form, Message } from "semantic-ui-react"
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
      error: "",
      redirect: false
    }
  }

  handleFormSubmit = () => {
    if (
      this.state.artifactData.title === this.state.title &&
      this.state.artifactData.description === this.state.description &&
      this.state.artifactData.day === this.state.day &&
      this.state.artifactData.month === this.state.month &&
      this.state.artifactData.tags === this.state.tags
    ) {
      const error = "No changes have been made!"
      this.setState({ error: error })
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
    this.setState({ redirect: true, error: "" })
  }

  handleUpdate = e => {
    let value = e.target.value
    let name = e.target.name
    this.setState({ [name]: value, error: "" })
    console.log(this.state)
  }

  handleCalendar = createdDate => {
    this.setState({
      createdTime: createdDate,
      day: createdDate.getDate(),
      month: createdDate.getMonth() + 1,
      error: ""
    })
  }

  handleUpdateTag = e => {
    this.setState({
      tags: e.target.value.split(" "),
      error: ""
    })
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
        <Form onSubmit={this.handleFormSubmit} size="large" widths="equal">
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
              rows="3"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleUpdate}
            ></textarea>
          </Form.Field>
          <Form.Field>
            <label>Date of Origin</label>
            <Calendar
              handleCalendar={this.handleCalendar}
              defaultValue={this.state.createdTime}
              ref="editCalendar"
            />
          </Form.Field>
          <Form.Field>
            <label>Tags (seperate with spaces)</label>
            <textarea
              rows="2"
              type="text"
              name="tags"
              value={this.state.tags.join(" ")}
              onChange={this.handleUpdateTag}
            ></textarea>
          </Form.Field>
          {this.state.error ? (
            <Message color="red">{this.state.error}</Message>
          ) : (
            ""
          )}
          <Button type="submit" color="violet">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default EditForm

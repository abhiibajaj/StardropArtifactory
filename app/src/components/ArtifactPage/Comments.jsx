import React from "react"
import withFirebase from "../../contexts/withFirebase"
import withAuth from "../../contexts/withAuth"
import { Button, Comment, Form, Header } from "semantic-ui-react"
import CommentContainer from "./CommentContainer"

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artifactId: this.props.artifactId,
      comments: [],
      newCommentAuthor: "",
      newCommentText: "",
      newCommentDate: null,
      errors: []
    }
  }

  componentDidMount() {
    this.fetchComments()
  }

  fetchComments = async () => {
    const artifactId = this.state.artifactId
    console.log("getting comments for artifact with id: " + artifactId)
    let commentsRef = this.props.firebase.db
      .collection("artifacts")
      .doc(artifactId)
      .collection("comments")
      .orderBy("dateCreated")
    let commentsCount = 0
    this.setState({ comments: [] })
    commentsRef
      .get()
      .then(snapshot => {
        snapshot.forEach(comment => {
          console.log(comment.id, "=>", comment.data())
          let comments = this.state.comments
          let commentContainer = (
            <CommentContainer
              key={commentsCount.toString()}
              author={comment.data().author}
              text={comment.data().text}
              dateCreated={comment.data().dateCreated}
            />
          )
          comments.push(commentContainer)
          this.setState({ comments: comments })
          commentsCount += 1
        })
      })
      .catch(err => {
        console.log("Error getting comments", err)
      })
  }

  handleFormSubmit = () => {
    if (this.state.newCommentText === "") {
      let errors = this.state.errors
      errors.push(<p>You cannot leave an empty comment.</p>)
      this.setState({ errors: errors })
      return
    }
    this.props.firebase.db
      .collection("artifacts")
      .doc(this.state.artifactId)
      .collection("comments")
      .doc()
      .set({
        author: this.state.newCommentAuthor,
        text: this.state.newCommentText,
        dateCreated: new Date()
      })
    console.log("Form submitted")
    this.fetchComments()
    this.clearErrors()
  }
  updateComment = e => {
    this.setState({
      newCommentAuthor: this.props.auth.data.email,
      newCommentText: e.target.value,
      newCommentDate: new Date()
    })
    e.target.value = ""
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

  render() {
    return (
      <div>
        <Comment.Group>
          <Header as="h3">Comments</Header>
          {this.state.comments.map(comment => comment)}
          <Form onSubmit={this.handleFormSubmit}>
            <Form.TextArea
              className="commentBox"
              onBlur={this.updateComment}
              placeholder="Write a comment..."
            />
            {this.renderErrors()}
            <Button
              color="violet"
              content="Add Comment"
              labelPosition="left"
              icon="comment"
            />
          </Form>
        </Comment.Group>
      </div>
    )
  }
}

export default withAuth(withFirebase(Comments))

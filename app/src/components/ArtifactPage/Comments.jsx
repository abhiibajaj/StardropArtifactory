import React from "react"
import withFirebase from "../../contexts/withFirebase"
import { Button, Comment, Form, Header } from "semantic-ui-react"
import CommentContainer from "./CommentContainer"

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artifactId: this.props.artifactId,
      comments: [],
      newCommentAuthor: "",
      newCommentText: ""
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
    let commentsCount = 0
    this.setState({ comments: [] })
    let commentsGet = commentsRef
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
    let commentsRef = this.props.firebase.db
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
  }
  updateComment = e => {
    this.setState({
      newCommentAuthor: "Jimmy",
      newCommentText: e.target.value
    })
    console.log("comment: " + e.target.value)
  }

  render() {
    return (
      <div>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>
          {this.state.comments.map(comment => comment)}
          <Form onSubmit={this.handleFormSubmit}>
            <Form.TextArea
              className="commentBox"
              onBlur={this.updateComment}
              placeholder="Say something..."
            />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </div>
    )
  }
}

export default withFirebase(Comments)

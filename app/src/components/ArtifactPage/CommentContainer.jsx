import React from "react"
import { Button, Comment, Form, Header } from "semantic-ui-react"

const CommentContainer = props => {
  return (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>Today at 2pm</div>
        </Comment.Metadata>
        <Comment.Text>{props.text}</Comment.Text>
      </Comment.Content>
      {console.log(props.text)}
    </Comment>
  )
}

export default CommentContainer

import React from "react"
import { Comment } from "semantic-ui-react"

function checkZero(data) {
  if (data.length === 1) {
    data = "0" + data
  }
  return data
}

const formatTime = date => {
  let day = date.getDate() + ""
  let month = date.getMonth() + 1 + ""
  let year = date.getFullYear() + ""
  let hour = date.getHours() + ""
  let minutes = date.getMinutes() + ""
  let seconds = date.getSeconds() + ""

  day = checkZero(day)
  month = checkZero(month)
  year = checkZero(year)
  hour = checkZero(hour)
  minutes = checkZero(minutes)
  seconds = checkZero(seconds)

  return (
    day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds
  )
}

const CommentContainer = props => {
  const commentTime = new Date(props.dateCreated.seconds * 1000)
  return (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{formatTime(commentTime)}</div>
        </Comment.Metadata>
        <Comment.Text>{props.text}</Comment.Text>
      </Comment.Content>
      {console.log(props.text)}
    </Comment>
  )
}

export default CommentContainer

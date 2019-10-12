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

const avatars = [
  "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
  "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
  "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
  "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
  "https://react.semantic-ui.com/images/avatar/small/steve.jpg",
  "https://react.semantic-ui.com/images/avatar/small/christian.jpg"
]

const getAvatarForAuthor = author => {
  let i = 0
  let hash = 0
  for (i = 0; i < author.length; i++) {
    let char = author.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  hash = Math.abs(hash)
  const index = hash % avatars.length
  return avatars[index]
}

const CommentContainer = props => {
  const commentTime = new Date(props.dateCreated.seconds * 1000)
  return (
    <Comment>
      <Comment.Avatar src={getAvatarForAuthor(props.author)} />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{formatTime(commentTime)}</div>
        </Comment.Metadata>
        <Comment.Text>{props.text}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default CommentContainer

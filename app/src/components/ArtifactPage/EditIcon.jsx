import React from "react"
import { Link } from "react-router-dom"

const EditIcon = props => {
  return (
    <div className="edit-icon">
      <Link to={"/artifact/edit/" + props.artifactId}>
        <i className="fa fa-pencil-square-o fa-4x" aria-hidden="true"></i>
      </Link>
    </div>
  )
}

export default EditIcon

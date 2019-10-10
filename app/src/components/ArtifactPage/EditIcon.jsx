import React from "react"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

const EditIcon = props => {
  return (
    <div className="edit-icon">
      <Link to={"/artifact/edit/" + props.artifactId}>
        <Button
          color="violet"
          content="Edit Artifact"
          labelPosition="left"
          icon="edit"
        />
      </Link>
    </div>
  )
}

export default EditIcon

import React from 'react'
import { Link } from "react-router-dom";

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div>
          Hello Auth Page
        </div>
        <div>
          <Link to="/artifact_of_the_day">
            <span className="artifactOTD-text">*Artifact of the Day*</span>
          </Link>
        </div>
      </div>
    )
  }
}
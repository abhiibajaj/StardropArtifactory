import React from 'react'
import withFirebase from '../../contexts/withFirebase'
import Search from '../Search'
import ArtifactOfTheDay from '../ArtifactOfTheDay'
import { Grid } from 'semantic-ui-react'
class HomePage extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gridTemplateRows: 'auto',
          justifyItems: 'center'
        }}
      >
        <div style={{ width: '100%' }}>
          <Search />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <ArtifactOfTheDay />
        </div>
      </div>
    )
  }
}

export default withFirebase(HomePage)

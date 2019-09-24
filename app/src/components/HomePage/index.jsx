import React from 'react'
import withFirebase from '../../contexts/withFirebase'
import SearchBox from '../SearchBox'
import SearchResults from '../SearchResults'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
  }

  componentDidMount() {
    // this.props
    //   .firebase
    //   .db
    //   .collection('artifacts')
    //   .doc('L5AkgsaL78dE5OCylA5y')
    //   .get()
    //   .then(doc => console.log(JSON.stringify(doc.data())))
  }

  setResults = results => this.setState({ results })

  render() {
    const { results } = this.state
    return (
      <div>
        <SearchBox setResults={this.setResults} />
        <SearchResults results={results} />
      </div>
    )
  }
}

export default withFirebase(HomePage)
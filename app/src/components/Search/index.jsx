import React from 'react'
import algoliasearch from 'algoliasearch'

import SearchBox from './SearchBox'
import SearchResults from './SearchResults'
import LoadMore from './LoadMore'

const pagination_state = {
  query: '',
  current: -1,
  next: 0,
  pages: 1
}

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoadMore: false,
      results: [],
      query: '',
      pagination: pagination_state,
    }
    const client = algoliasearch('80R55RX4B0', 'f4d2a2933485412a8331047b474dd466')
    this.index = client.initIndex('ARTIFACTS')
  }

  componentDidMount() {
    this.doSearch()
  }

  doSearch = () => {
    const { query, pagination } = this.state
    const payload = {
      query,
      page: pagination.next,
      hitsPerPage: 20
    }
    this.index.search(payload, (err, res) => {
      // extract data from res
      const { query, hits, nbPages, page } = res
      this.setState(prevState => ({
        // set pagination
        pagination: {
          query,
          current: page,
          next: page + 1,
          pages: nbPages
        },
        // show loadmore iff next page is below the amount of pages
        showLoadMore: (page + 1) < nbPages,
        // add results to end of array
        results: [...prevState.results, ...hits],
      })
      )
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { pagination, query } = this.state
    // if this is a different query
    pagination.query !== query
      // reset the results and pagination
      ? this.setState(
        {
          results: [],
          pagination: pagination_state
        },
        () => this.doSearch())
      // otherwise do normal search
      : this.doSearch()
  }

  handleQueryInput = e => this.setState({ query: e.target.value })

  render() {
    const { query, results, showLoadMore } = this.state
    return (
      <>
        <SearchBox
          query={query}
          onSubmit={this.handleSubmit}
          onChange={this.handleQueryInput}
        />
        <SearchResults
          results={results}
          last={() => showLoadMore ? <LoadMore onClick={this.handleSubmit} /> : ''}
        />
      </>
    )
  }
}
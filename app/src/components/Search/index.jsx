import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'

import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

export default function Search() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  // initialise algolia
  const client = algoliasearch('80R55RX4B0', 'f4d2a2933485412a8331047b474dd466')
  const index = client.initIndex('ARTIFACTS')

  function handleSubmit(e) {
    // stop the form from reloading the page
    e.preventDefault()
    // do a search
    index.search({ query }, (err, res) => {
      if (err) console.log(err)
      const { hits } = res
      console.log(hits)
      setResults(hits)
    })
  }

  // change the query on input change
  function handleQueryInput(e) { setQuery(e.target.value) }

  return (
    <>
      <SearchBox
        query={query}
        onSubmit={handleSubmit}
        onChange={handleQueryInput}
      />
      <SearchResults results={results} />
    </>
  )
}

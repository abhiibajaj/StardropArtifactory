import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
import { Form } from 'react-bootstrap'
import styles from './index.module.css'

export default function SearchBox({ setResults }) {
  // initialise algolia
  const client = algoliasearch('80R55RX4B0', 'f4d2a2933485412a8331047b474dd466')
  const index = client.initIndex('ARTIFACTS')
  // create local state
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    // stop the form from reloading the page
    e.preventDefault()
    // do a search
    index.search({ query }, (err, { hits } = {}) => {
      if (err) console.log(err)
      console.log(hits)
      setResults(hits)
    })
  }

  // change the query on input change
  function handleInput(e) { setQuery(e.target.value) }

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit} className={styles.searchForm}>
        <Form.Control type="search" value={query} onChange={handleInput} />
      </Form>
    </div>
  )
}
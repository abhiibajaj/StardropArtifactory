import React from 'react'
import styles from './index.module.css'
import Item from './Item'

function SearchResults({ results, last }) {
  return (
    <div className={styles.container}>
      {results.map(data => (
        <Item key={data.objectID} data={data} />
      ))}
      {last()}
    </div>
  )
}

export default SearchResults

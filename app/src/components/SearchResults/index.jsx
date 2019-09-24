import React from 'react'
import styles from './index.module.css'
import withFirebase from '../../contexts/withFirebase'
import Item from './Item'

function SearchResults({ results, firebase }) {
  console.log(firebase)
  return (
    <div className={styles.container}>
      {results.map(data => <Item key={data.objectID} data={data} storage={firebase.storage} />)}
    </div>
  )
}

export default withFirebase(SearchResults)
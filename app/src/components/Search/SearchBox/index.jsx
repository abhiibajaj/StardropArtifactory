import React from 'react'
import { Form } from 'react-bootstrap'
import styles from './index.module.css'

export default function SearchBox({ query, onSubmit, onChange }) {
  return (
    <div className={styles.container}>
      <Form onSubmit={onSubmit} className={styles.searchForm}>
        <Form.Control type="search" value={query} onChange={onChange} />
      </Form>
    </div>
  )
}
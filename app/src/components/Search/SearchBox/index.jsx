import React from 'react'
import { Form, Input } from 'semantic-ui-react'
import styles from './index.module.css'

export default function SearchBox({ query, onSubmit, onChange }) {
  return (
    <div className={styles.container}>
      <Form onSubmit={onSubmit} className={styles.searchForm}>
        {/* <Form.Control type="search" value={query} onChange={onChange} /> */}
        <Input
          fluid
          icon="search"
          iconPosition="left"
          placeholder="Search..."
          value={query}
          onChange={onChange}
        />
      </Form>
    </div>
  )
}

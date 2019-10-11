import React from 'react'
import styles from './index.module.css'
import { Button } from 'react-bootstrap'

export default function LoadMore({ onClick }) {
  return (
    <div className={styles.container}>
      <Button className={styles.button} variant="primary" size="lg" onClick={onClick}>
        Load More
      </Button>
    </div>
  )
}
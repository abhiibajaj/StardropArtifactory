import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import styles from './Item.module.css'
import RippleLoader from '../RippleLoader'

export default function Item({ data = {}, storage }) {
  const [image, setImage] = useState('')

  storage
    .refFromURL(data.image)
    .getDownloadURL()
    .then(url => setImage(url))

  return (
    <Card className={styles.card}>
      {
        image === ''
          ? <RippleLoader />
          : <Card.Img variant="top" src={image} />
      }
      <Card.Body>
        <Card.Text>{data.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}
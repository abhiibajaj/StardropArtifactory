import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import styles from './Item.module.css'
import RippleLoader from '../../RippleLoader'

export default function Item({ data = {}, storage }) {
  const [image, setImage] = useState('')

  useEffect(() => {
    storage
      .refFromURL(data.image)
      .getDownloadURL()
      .then(url => setImage(url))
  }, [data, image, storage])

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div style={{ height: '300px' }}>
          {
            image === ''
              ? <RippleLoader />
              : <Card.Img variant="top" src={image} />
          }
        </div>
        <Card.Body>
          <Card.Text>{data.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
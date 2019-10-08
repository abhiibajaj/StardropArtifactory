import React from 'react'
import { Link } from "react-router-dom"
import { Card } from 'react-bootstrap'
import styles from './Item.module.css'

export default function Item({ data = {}, storage }) {
  return (
    <Link to={`/artifact/${data.objectID}`}>
      <div className={styles.container}>
        <Card className={styles.card}>
          {
            data.imageTypes
              && data.imageTypes[0]
              && data.imageTypes[0].startsWith('image') ?
              <Card.Img style={{ 'height': '300px', 'objectFit': 'cover' }} variant="top" src={data.image[0]} />
              : <Card.Img style={{ 'height': '300px', 'objectFit': 'cover' }} variant="top" src={data.image[0]} />
          }
          <Card.Body>
            <Card.Text>{data.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Link>
  )
}
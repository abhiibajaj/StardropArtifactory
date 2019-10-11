import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'

function displayFile(type, link) {
  const style = {
    height: '300px',
    width: '300px',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center'
  }
  if (type.length > 0 && link.length > 0) {
    const t = type[0]
    if (t.startsWith('image')) {
      return (
        <Image
          src={link[0]}
          ui={true}
          style={{
            height: '300px',
            width: '300px',
            objectFit: 'cover'
          }}
        />
      )
    } else if (t.includes('pdf')) {
      return <Icon name="file pdf outline" size="huge" style={style} />
    } else if (t.includes('html')) {
      return <Icon name="file html outline" size="huge" style={style} />
    } else {
      return <Icon name="star outline" size="huge" style={style} />
    }
  } else {
    return <Icon name="file circle" size="huge" style={style} />
  }
}

export default function Item({ data = {} }) {
  return (
    <Card>
      <Link to={`/artifact/${data.objectID}`}>
        <Card.Content>
          {displayFile(data.imageTypes, data.image)}
          <Card.Header style={{ fontSize: '1.25rem', padding: '1rem' }}>
            {data.title}
          </Card.Header>
        </Card.Content>
      </Link>
    </Card>
  )
}

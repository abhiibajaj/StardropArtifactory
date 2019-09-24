import React from 'react'

export default function Item({ data = {}, storage }) {
  let url = ''

  storage
    .refFromURL(data.image)
    .getDownloadURL()
    .then(data => url = data)

  return (
    <div>
      <img src={url} alt={data.description} />
      <div>{data.description}</div>
    </div>
  )
}
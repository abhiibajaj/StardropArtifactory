import React from "react"
import styles from "./index.module.css"

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  )
}

import React from 'react'
import styles from './styles.module.scss'

export const Title = ({ title, ending, paragraph }) => {
  return (
    <>
      <h1 className={styles.wrapper}>
        <span className={styles.title}>{title}
          <span className={styles.point}>{ending}</span>
        </span>
      </h1>
      {paragraph ? <p className={styles.paragraph}>{paragraph}</p> : null}
    </>
  )
}

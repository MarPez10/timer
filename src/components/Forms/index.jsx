import React from 'react'
import styles from './styles.module.scss'
import { Title } from '../Title'

export function Forms ({ children, title, ending, onSubmit, error, paragraph }) {
  return (
    <div className={styles.forms}>
      <Title
        title={title}
        ending={ending}
        paragraph={paragraph}
      />
      <form onSubmit={onSubmit}>
        {children}
        {error ? <span className={styles.error}>{error}</span> : null}
      </form>
    </div>)
}

import React from 'react'
import styles from './styles.module.scss'
import { Title } from '../Title'
import { classNames } from '../../utils/classNames'

export function Forms ({ children, title, ending, onSubmit, error, paragraph, style }) {
  const className = classNames(
    {
      [styles.authForm]: style === 'authForm',
      [styles.homeForm]: style === 'homeForm'
    }
  )
  return (
    <div className={className}>
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

import React from 'react'
import styles from './styles.module.scss'
import { classNames } from '../../../utils/classNames'

export const Scoreboard = ({ background, text, plusMinutes }) => {
  const className = classNames(
    styles.scoreboard,
    {
      [styles.red]: background === 'red',
      [styles.green]: background === 'green',
      [styles.white]: background === 'white'
    }
  )
  return (
    <div className={className}>
      <span className={styles.plusMinutes}>{plusMinutes}</span>
      <span className={styles.counter}>
        {text}
      </span>
    </div>
  )
}

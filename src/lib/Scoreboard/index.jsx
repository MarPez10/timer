import React from 'react'
import styles from './styles.module.scss'
import { classNames } from '../../utils/classNames'

export const Scoreboard = ({ style, text, plusMinutes }) => {
  const className = classNames(
    styles.scoreboard,
    {
      [styles.red]: style === 'red',
      [styles.green]: style === 'green',
      [styles.white]: style === 'white'
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

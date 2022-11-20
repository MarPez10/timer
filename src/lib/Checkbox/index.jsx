import React from 'react'
import styles from './styles.module.scss'
import { classNames } from '../../utils/classNames'

export const Checkbox = ({ type, text, onClick, style }) => {
  const className = classNames(
    styles.fake,
    {
      // [styles.fake__kub]: style === 'fake__kub',
      [styles.fake__ball]: style === 'fake__ball'
    }
  )
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input type={type} className={styles.checkbox} onClick={onClick}/>
        <span className={className}></span>
        <span className={styles.text}>{text}</span>
      </label>
    </div>
  )
}

import React from 'react'
import styles from './styles.module.scss'

export const Button = ({ type, disabled, text, onClick }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>{text}</button>
  )
}

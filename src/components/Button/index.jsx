import React from 'react'
import styles from './styles.module.scss'
import { classNames } from '../../utils/classNames'

export const Button = ({ type, disabled, text, onClick, style }) => {
  const className = classNames(
    styles.button,
    {
      [styles.buttonForm]: style === 'buttonForm',
      [styles.entranceButton]: style === 'entranceButton',
      [styles.registrationButton]: style === 'registrationButton',
      [styles.button__red]: style === 'button__red',
      [styles.button__white]: style === 'button__white',
      [styles.button__dark]: style === 'button__dark'
    }
  )
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>{text}</button>
  )
}

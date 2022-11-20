import React from 'react'
import styles from './styles.module.scss'
import { classNames } from '../../utils/classNames'

export const Button = ({ type, disabled, text, onClick, style, width }) => {
  const className = classNames(
    styles.button,
    {
      [styles.buttonForm]: style === 'buttonForm',
      [styles.entranceButton]: style === 'entranceButton',
      [styles.registrationButton]: style === 'registrationButton',

      [styles.buttonRed]: style === 'buttonRed',
      [styles.button__red]: style === 'button__red',
      [styles.button__white]: style === 'button__white',
      [styles.button__dark]: style === 'button__dark',

      [styles.buttonAdmin__red]: style === 'buttonAdmin__red',
      [styles.buttonAdmin__dark]: style === 'buttonAdmin__dark',

      [styles.dropDownButtonMain]: style === 'dropDownButtonMain'
    }
  )
  return (
    <button className={className} style={{ width }} type={type} onClick={onClick} disabled={disabled}>{text}</button>
  )
}

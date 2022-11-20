import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const DropDown = ({ text, active, onClick, to }) => {
  return (
    <Link to={to} onClick={onClick} className={active ? styles.dropDown__active : styles.dropDown}>
      <div className={styles.dropDown__content} >
        {text}
      </div>
    </Link>
  )
}

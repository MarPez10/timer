import React from 'react'
import styles from './styles.module.scss'

export const Modal = ({ text, active, onClick }) => {
  return (
       <button className={active ? styles.dropDown__active : styles.dropDown} onClick={onClick}>
        <div className={styles.dropDown__content} onClick={e => e.stopPropagation()}>{text}
        </div>
      </button>
  )
}

import React from 'react'
import styles from './styles.module.scss'
import { EntranceButton } from '../EntranceButton'
import { RegistrationButton } from '../RegistrationButton'

export const HeaderAuth = () => {
  return (
    <div className={styles.header}>
      <a href="/">MarPez</a>
      <div >
        <EntranceButton />
        <RegistrationButton />
      </div>
    </div>
  )
}

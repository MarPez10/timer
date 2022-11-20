import React from 'react'
import styles from './styles.module.scss'
import { Button } from '../../lib/Button'
import { useNavigate } from 'react-router-dom'

export const HeaderAuth = () => {
  const navigate = useNavigate()
  const toEntrance = () => navigate('/auth/login')
  const toRegistration = () => navigate('/auth/registration')
  return (
    <div className={styles.header}>
      <a href="/">MarPez</a>
      <div >
          <Button
          style="entranceButton"
          text='ВХОД'
          onClick={toEntrance}
          />
          <Button
          style="registrationButton"
          text='РЕГИСТРАЦИЯ'
          onClick={toRegistration}
          />
      </div>
    </div>
  )
}

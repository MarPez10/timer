import React from 'react'
import styles from './styles.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom'

import { LoginForm } from '../../components/LoginForm'
import { RegistrationForm } from '../../components/RegistrationForm'
import { ForgotPassForm } from '../../components/ForgotPassForm'
import { InformationForm } from '../../components/InformationForm'

export const Auth = () => {
  return (
    <div className={styles.auth}>
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/auth/registration" element={<RegistrationForm />} />
        <Route path="/auth/forgotpassword" element={<ForgotPassForm />} />
        <Route path="/auth/recoveryinfo" element={<InformationForm />} />
        <Route path="/" element={<Navigate to="/auth/login" />} />
      </Routes>
    </div>
  )
}

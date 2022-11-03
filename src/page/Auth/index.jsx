import React from 'react'
import styles from './styles.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom'

import { LoginForm } from '../../components/LoginForm'
import { RegistrationForm } from '../../components/RegistrationForm'
import { ForgotPassForm } from '../../components/ForgotPassForm'
import { InformationForm } from '../../components/InformationForm'
import { HeaderAuth } from '../../components/HeaderAuth'

export const Auth = () => {
  return (
    <div className={styles.auth}>
      <HeaderAuth/>
      <Routes path="/auth/" element={<Auth />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="registration" element={<RegistrationForm />} />
        <Route path="reset" element={<ForgotPassForm />} />
        <Route path="recoveryinfo" element={<InformationForm />} />
        <Route path="/" element={<Navigate to="/auth/login" />} />
      </Routes>
    </div>
  )
}

import React from 'react'
import styles from './styles.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from '../../components/Forms/LoginForm'
import { RegistrationForm } from '../../components/Forms/RegistrationForm'
import { ForgotPassForm } from '../../components/Forms/ForgotPassForm'
import { HeaderAuth } from '../../components/HeaderAuth'
// import { EditForm } from '../../components/Forms/EditForm'

export const Auth = () => {
  return (
    <div className={styles.auth}>
      <HeaderAuth/>
      {/* <EditForm /> */}
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/auth/registration" element={<RegistrationForm />} />
        <Route path="/auth/reset" element={<ForgotPassForm />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </div>
  )
}

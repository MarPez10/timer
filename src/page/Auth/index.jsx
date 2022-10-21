import styles from './styles.module.scss'
import { Routes, Route, Navigate} from 'react-router-dom'

import {LoginForm} from '../../components/LoginForm'
import {RegistrationForm} from "../../components/RegistrationForm"
import {ForgotPassForm} from "../../components/ForgotPassForm"
import {RecoveryForm} from "../../components/RecoveryForm"

export const Auth = () => {

  return (
    <div className={styles.auth}>
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/auth/registration" element={<RegistrationForm />} />
        <Route path="/auth/forgotpassword" element={<ForgotPassForm />} />
        <Route path="/auth/recovery" element={<RecoveryForm />} />
        <Route path="/" element={<Navigate to="/auth/login" />} />
      </Routes>
    </div>
  )
}




import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const RegistrationButton = () => {

  return (
    <>
      <Link to="/auth/registration" className={styles.registrationButton}>РЕГИСТРАЦИЯ</Link>
    </>
  )
}



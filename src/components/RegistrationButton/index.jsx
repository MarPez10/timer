import styles from './styles.module.scss'

export const RegistrationButton = ({enter}) => {
  return (
    <button onClick={enter} className={styles.registrationButton}>РЕГИСТРАЦИЯ</button>
  )
}



import styles from './styles.module.scss'

export const EntranceButton = ({ enter}) => {
  return (
    <button onClick={enter} className={styles.entranceButton}>ВХОД</button>
  )
}

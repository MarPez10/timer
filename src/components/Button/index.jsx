import styles from './styles.module.scss'

export const Button = ({type, disabled, text}) => {

  return (
    <button className={styles.button} type={type} disabled={disabled}>{text}</button>
  )
}
import styles from './styles.module.scss'

export const Checkbox = ({type, text}) => {

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input type={type} className={styles.checkbox}/>
        <span className={styles.fake}></span>
        <span className={styles.text}>{text}</span>
      </label>
    </div>
  )
}
import styles from './styles.module.scss'

export const Title = ({type, title1, title2, title3, title4, title5, text, point}) => {

  return (
    <h1 className={styles.wrapper}>
      <span className={styles.title}>{title1}</span>
      <span className={styles.title}>{title2}</span>
      <span className={styles.title}>{title3}</span>
      <span className={styles.title}>{title4}</span>
      <span className={styles.title}>{title5}<span className={styles.point}>{point}</span></span>
    </h1>
  )
}
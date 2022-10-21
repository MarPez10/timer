import styles from './styles.module.scss'
import {Title} from "../Title"
import {Link} from "react-router-dom"

export function RecoveryForm() {

  return (
    <div className={styles.recoveryForm}>
      <Title
        title={"ССЫЛКА ДЛЯ \n" +
          "ВОССТАНОВЛЕНИЯ\n" +
          "ПАРОЛЯ ОТПРАВЛЕНА\n" +
          "НА ПОЧТУ "}
        ending="."
      />
      <Link to='/auth/login' className={styles.goBack}>Вернуться</Link>
    </div>)
}
import {useForm} from 'react-hook-form'
import styles from './styles.module.scss'
import {Input} from "../Input"
import {Button} from "../Button"
import {Title} from "../Title"
import {Link} from "react-router-dom"

export function ForgotPassForm() {
  const {formState} = useForm({
    mode: "onBlur",
  })
  function onSubmit(enter) {
  }

  return (
    <div className={styles.ForgotPassForm}>
      <Title
        title={"ЗАБЫЛ ПАРОЛЬ"}
        ending="?"
      />
      <p className={styles.text}>не переживай, такое случается с лучшими из нас</p>
      <form onSubmit={onSubmit}>
        <Input
          name="email"
          placeholder="Введи почту @clickable.agency"
          type="text"
        />
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          text="ОТПРАВИТЬ ССЫЛКУ НА ПОЧТУ"
        />
        <Link to='/auth/login' className={styles.goBack}>Вернуться</Link>
      </form>
    </div>)
}
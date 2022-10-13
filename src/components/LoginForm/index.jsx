import {useForm} from 'react-hook-form'
import styles from './styles.module.scss'
import {Input} from "../Input"
import {Button} from "../Button"
import {Checkbox} from "../Checkbox"
import {Title} from "../Title"

export function LoginForm() {
  const {formState} = useForm({
    mode: "onBlur",
  })
  function onSubmit(data) {
  }

  return (
    <div className={styles.loginForm}>
      <Title
        title={"ВХОД\nВ ОТМЕЧАЛОЧКУ"}
        ending="."
      />
      <form onSubmit={onSubmit}>
        <Input
          name="email"
          placeholder="Почта"
          type="text"
        />
        <Input
          name="password"
          placeholder="Пароль"
          type="password"
        />
        <Checkbox
          type="checkbox"
          text="Запомните меня таким"
        />
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          text="ЗАЛОГИНИТЬСЯ"
        />
        <a href='/' className={styles.forgotPassword}>Забыли пароль?</a>
      </form>
    </div>)
}
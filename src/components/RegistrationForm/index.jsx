import {useForm} from 'react-hook-form'
import styles from './styles.module.scss'
import {Input} from "../Input"
import {Button} from "../Button"
import {Checkbox} from "../Checkbox"
import {Title} from "../Title"

// import {Login} from "../../app.interface"

export function RegistrationForm() {
  const {formState} = useForm({
    mode: "onBlur",
  })
  function onSubmit(data) {
  }

  return (
    <div className={styles.registrationForm}>
      <Title
        title1="ВХОД"
        title5="В ОТМЕЧАЛОЧКУ"
        point="."
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
        <span className={styles.forgotPassword}>Забыли пароль?</span>
      </form>
    </div>)
}
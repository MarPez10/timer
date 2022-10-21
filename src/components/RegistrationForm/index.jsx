import {useForm} from 'react-hook-form'
import styles from './styles.module.scss'
import {Input} from "../Input"
import {Button} from "../Button"
import {Title} from "../Title"


export function RegistrationForm() {
  const {formState} = useForm({
    mode: "onBlur",
  })
  function onSubmit(registration) {
  }

  return (
    <div className={styles.registrationForm}>
      <Title
        title={"РЕГИСТРАЦИЯ\nВ ОТМЕЧАЛОЧКЕ"}
        ending=" ."
      />
      <form onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Фамилия и имя"
          type="text"
        />
        <Input
          name="email"
          placeholder="Почта @clickable.agency"
          type="text"
        />
        <Input
          name="password"
          placeholder="Почта"
          type="password"
        />
        <Input
          name="password"
          placeholder="Еще разок пароль"
          type="password"
        />
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          text="РЕГИСТРАЦИЯ"
        />
      </form>
    </div>)
}
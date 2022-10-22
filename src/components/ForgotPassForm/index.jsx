import React from 'react'
// import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Input } from '../Input'
import { Button } from '../Button'
import { Title } from '../Title'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export function ForgotPassForm () {
  const RecoveryFormSchema = yup.object().shape({
    email: yup.string()
      .email('Введите верный email')
      .required('Обязательно')
  })
  const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RecoveryFormSchema)
  })

  const onSubmit = () => {
    console.log(getValues(), errors)
  }

  return (
    <div className={styles.ForgotPassForm}>
      <Title
        title={'ЗАБЫЛ ПАРОЛЬ'}
        ending="?"
      />
      <p className={styles.text}>не переживай, такое случается с лучшими из нас</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="email"
          placeholder="Введи почту @clickable.agency"
          type="text"
        />
        <span className={styles.error}>{errors.email?.message}</span>
        <Button
          onClick={onSubmit}
          disabled={!isValid}
          type="submit"
          text="ОТПРАВИТЬ ССЫЛКУ НА ПОЧТУ"
        />
        <Link to='/auth/login' className={styles.goBack}>Вернуться</Link>
      </form>
    </div>)
}

import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Input } from '../Input'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Title } from '../Title'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export function LoginForm () {
  const LoginFormSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Длина пароля должна быть более 6 символов')
      .typeError('Должно быть строкой')
      .required('Обязательно'),
    email: yup.string()
      .email('Введите верный email')
      .required('Обязательно')
  })
  const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(LoginFormSchema)
  })

  const onSubmit = () => {
    console.log(getValues(), errors)
  }

  return (
    <div className={styles.loginForm}>
      <Title
        title={'ВХОД\nВ ОТМЕЧАЛОЧКУ'}
        ending="."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="email"
          placeholder="Почта"
          type="text"
        />
        <span className={styles.error}>{errors.email?.message}</span>
        <Input
          register={register}
          name="password"
          placeholder="Пароль"
          type="password"
        />
        <span className={styles.error}>{errors.password?.message}</span>
        <Checkbox
          type="checkbox"
          text="Запомните меня таким"
        />
        <Button
          onClick={onSubmit}
          disabled={!isValid}
          type="submit"
          text="ЗАЛОГИНИТЬСЯ"
        />
        <Link to='/auth/forgotpassword' className={styles.forgotPassword}>Забыли пароль?</Link>
      </form>
    </div>)
}

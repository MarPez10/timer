import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Input } from '../Input'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Title } from '../Title'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'
// import { validateActive } from '@reduxjs/toolkit/dist/listenerMiddleware/task'

export function LoginForm () {
  const LoginFormSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Длина пароля должна быть более 6 символов')
      .typeError('Должно быть строкой')
      .required('Обязательно'),
    email: yup
      .string()
      .email('Введите верный email')
      .required('Обязательно'),
    remember: yup
      .boolean(false)
  })
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema)
  })
  const navigate = useNavigate()

  const [error, useError] = useState('')
  // const [check, useCheck] = useState('')
  // const toggleType = () => useCheck(prev => !prev)
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password, data.remember)
      // await toggleType
      await navigate('/home')
    } catch (e) {
      useError('Неверный пароль')
    }
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
          register={register}
          // onChange={check}
          name="remember"
          type="checkbox"
          text="Запомните меня таким"
        />
        <Button
          disabled={!isValid}
          type="submit"
          text="ЗАЛОГИНИТЬСЯ"
        />
        <Link to='/auth/reset' className={styles.forgotPassword}>Забыли пароль?</Link>
        <span className={styles.error}>{error}</span>
      </form>
    </div>)
}

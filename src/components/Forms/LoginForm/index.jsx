import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { Checkbox } from '../../Checkbox'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase/firebaseConfig'
import { addUser } from '../../../redux/reducers/user'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { Forms } from '../index'

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
      .required('Обязательно')
  })
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema)
  })
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [error, useError] = useState('')

  const [remember, setRemember] = useState(false)
  const toggleType = () => setRemember(prev => !prev)

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      const response = await getDoc(doc(db, 'users', data.email))
      if (response.exists()) {
        const { name, email, isAdmin } = response.data()
        dispatch(addUser({ name, email, isAdmin }))
        remember
          ? localStorage.setItem('user', JSON.stringify({ name, email, isAdmin }))
          : sessionStorage.setItem('user', JSON.stringify({ name, email, isAdmin }))
      } else {
        console.log('No such document!')
      }
      await navigate('/home')
    } catch (e) {
      useError('Неверный пароль')
    }
  }

  return (
    <Forms
      title={'ВХОД\nВ ОТМЕЧАЛОЧКУ'}
      ending="."
      onSubmit={handleSubmit(onSubmit)}
      error={error}
    >
        <Input
          register={register}
          name="email"
          placeholder="Почта"
          type="text"
          errorText={errors.email?.message}
        />
        <Input
          register={register}
          name="password"
          placeholder="Пароль"
          type="password"
          errorText={errors.password?.message}
        />
        <Checkbox
          name="remember"
          type="checkbox"
          onClick={toggleType}
          text="Запомните меня таким"
        />
        <Button
          disabled={!isValid}
          type="submit"
          text="ЗАЛОГИНИТЬСЯ"
          style="buttonForm"
        />
        <Link to='/auth/reset' className={styles.forgotPassword}>Забыли пароль?</Link>
    </Forms>
  )
}

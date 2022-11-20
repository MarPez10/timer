import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Input } from '../../../lib/Input'
import { Button } from '../../../lib/Button'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebase/firebaseConfig'
import { Forms } from '../index'

export function ForgotPassForm () {
  const RecoveryFormSchema = yup.object().shape({
    email: yup.string()
      .email('Введите верный email')
      .required('Обязательно')
  })
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RecoveryFormSchema)
  })
  const [error, useError] = useState('')
  const onSubmit = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email)
      await useError(`Ссылка была отправлена на ${data.email}`)
    } catch (e) {
      useError('Такой email не зарегестрирован')
    }
  }
  return (
    <Forms
      style="authForm"
      title={'ЗАБЫЛ ПАРОЛЬ'}
      ending="?"
      paragraph="не переживай, такое случается с лучшими из нас"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <p className={styles.text}>не переживай, такое случается с лучшими из нас</p> */}
        <Input
          style='input'
          register={register}
          name="email"
          placeholder="Введи почту @clickable.agency"
          type="text"
          errorText={errors.email?.message || error}
        />
        <Button
          disabled={!isValid}
          type="submit"
          text="ОТПРАВИТЬ ССЫЛКУ НА ПОЧТУ"
          style="buttonForm"
        />
        <Link to='/auth/login' className={styles.goBack}>Вернуться</Link>
    </Forms>
  )
}

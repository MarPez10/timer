import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../../lib/Input'
import { Button } from '../../../lib/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { Forms } from '../index'
import { useNavigate } from 'react-router-dom'

export function RegistrationForm () {
  const RegFormSchema = yup.object().shape({
    name: yup.string()
      .typeError('Должно быть строкой')
      .required('Обязательно'),
    email: yup.string()
      .email('Введите верный email')
      .required('Обязательно'),
    password: yup.string()
      .min(6, 'Длина пароля должна быть более 6 символов')
      .typeError('Должно быть строкой')
      .required('Обязательно'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Обязательно')
  })

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegFormSchema)
  })
  const [error, useError] = useState('')
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user
          user.displayName = data.name
        })
      await setDoc(doc(db, 'users', data.email), {
        name: data.name,
        email: data.email,
        password: data.password,
        isAdmin: false
      })
      await navigate('/auth/login')
    } catch (e) {
      useError('Такой email уже существует')
    }
  }
  return (
      <Forms
        style='authForm'
        title={'РЕГИСТРАЦИЯ\nВ ОТМЕЧАЛОЧКЕ'}
        ending=" ."
        onSubmit={handleSubmit(onSubmit)}
        error={error}
      >
        <Input
          style='input'
          register={register}
          name="name"
          placeholder="Фамилия и имя"
          type="text"
          errorText={errors.name?.message}
        />
        <Input
          style='input'
          register={register}
          name="email"
          placeholder="Почта"
          type="text"
          errorText={errors.email?.message}
        />
        <Input
          style='input'
          register={register}
          name="password"
          placeholder="Пароль"
          type="password"
          errorText={errors.password?.message}
        />
        <Input
          style='input'
          register={register}
          name="confirmPassword"
          placeholder="Еще разок пароль"
          type="password"
          errorText={errors.confirmPassword?.message}
        />
        <Button
          disabled={!isValid}
          type="submit"
          text="РЕГИСТРАЦИЯ"
          style="buttonForm"
        />
      </Forms>
  )
}

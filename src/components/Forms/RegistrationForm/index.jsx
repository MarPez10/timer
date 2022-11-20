import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../Input'
import { Button } from '../../Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { Forms } from '../index'

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
      await useError('Вы успешно зарегестрированы')
    } catch (e) {
      useError('Такой email уже существует')
    }
  }
  return (
      <Forms
      title={'РЕГИСТРАЦИЯ\nВ ОТМЕЧАЛОЧКЕ'}
      ending=" ."
      onSubmit={handleSubmit(onSubmit)}
      error={error}
      >
        <Input
          register={register}
          name="name"
          placeholder="Фамилия и имя"
          type="text"
          errorText={errors.name?.message}
        />
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
        <Input
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

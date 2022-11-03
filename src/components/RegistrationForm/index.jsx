import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Input } from '../Input'
import { Button } from '../Button'
import { Title } from '../Title'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
// import { useDispatch } from 'react-redux'
// // import { registerUser } from '../../redux/reducers/user'
// import { useNavigate } from 'react-router-dom'

export function RegistrationForm () {
  // // const dispatch = useDispatch
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
    <div className={styles.registrationForm}>
      <Title
        title={'РЕГИСТРАЦИЯ\nВ ОТМЕЧАЛОЧКЕ'}
        ending=" ."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="name"
          placeholder="Фамилия и имя"
          type="text"
        />
        <span className={styles.error}>{errors.name?.message}</span>
        <Input
          register={register}
          name="email"
          placeholder="Почта @clickable.agency"
          type="text"
        />
        <span className={styles.error}>{errors.email?.message}</span>
        <Input
          register={register}
          name="password"
          placeholder="Почта"
          type="password"
        />
        <span className={styles.error}>{errors.password?.message}</span>
        <Input
          register={register}
          name="confirmPassword"
          placeholder="Еще разок пароль"
          type="password"
        />
        <span className={styles.error}>{errors.confirmPassword?.message}</span>
        <Button
          disabled={!isValid}
          type="submit"
          text="РЕГИСТРАЦИЯ"
        />
        <span className={styles.error}>{error}</span>
      </form>
    </div>)
}

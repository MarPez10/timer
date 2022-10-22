import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Input } from '../Input'
import { Button } from '../Button'
import { Title } from '../Title'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export function RegistrationForm () {
  const RegFormSchema = yup.object().shape({
    name: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательно'),
    email: yup.string()
      .email('Введите верный email')
      .required('Обязательно'),
    password: yup
      .string()
      .min(6, 'Длина пароля должна быть более 6 символов')
      .typeError('Должно быть строкой')
      .required('Обязательно'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
      .required('Обязательно')
  })

  const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RegFormSchema)
  })

  const onSubmit = () => {
    console.log(getValues(), errors)
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
          onClick={onSubmit}
          disabled={!isValid}
          type="submit"
          text="РЕГИСТРАЦИЯ"
        />
      </form>
    </div>)
}

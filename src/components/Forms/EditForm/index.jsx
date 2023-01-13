import React from 'react'
import styles from './styles.module.scss'
import { Forms } from '../index'
import { Input } from '../../../lib/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebaseConfig'
import { Button } from '../../../lib/Button'

export const EditForm = ({ active, setActive }) => {
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
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema)
  })
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (e) {
    }
  }
  return (
    <div className={active ? styles.modalActive : styles.modal} onClick={() => setActive(false)}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.editForm}>
          <Forms
            style='homeForm'
            title={'РЕДАКТИРОВАТЬ'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <button onClick={() => setActive(false)} className={styles.close} type={'button'}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L21 21M1 21L21 1" stroke="white"/>
              </svg>
            </button>
            <div className={styles.form}>
              <div className={styles.input}>
                <Input
                  label='ИМЯ И ФАМИЛИЯ'
                  register={register}
                  name="name"
                  type="text"
                  style='input'
                  errorText={errors.name?.message}/>
              </div>
              <div className={styles.input}>
                <Input
                  label='ВВЕДИТЕ СТАРЫЙ ПАРОЛЬ'
                  register={register}
                  name="password"
                  type="password"
                  style='input'
                  errorText={errors.password?.message}
                />
              </div>
              <div className={styles.input}>
                <Input
                  label='А ТЕПЕРЬ НОВЫЙ'
                  register={register}
                  name="password"
                  type="password"
                  style='input'
                  errorText={errors.password?.message}
                />
              </div>
              <div className={styles.button}>
                <Button
                  width={'320px'}
                  style='buttonRed'
                  text='СОХРАНИТЬ ИЗМЕНЕНИЯ'
                />
              </div>
            </div>
          </Forms>
        </div>
      </div>
    </div>
  )
}

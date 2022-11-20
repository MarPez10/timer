import React from 'react'
import styles from './styles.module.scss'
import { Button } from '../index'

export const ButtonsHome = () => {
  return (
    <div className={styles.buttonsHome}>
      <Button
        style="button__red"
        text="ПРИШЕЛ НА РАБОТУ"
      />
      <Button
        style="button__white"
        text="УШЕЛ ДОДОМУ"
      />
       <Button
        style="button__dark"
        text="РАБОТАЮ В ОБЕД"
       />
       <Button
        style="button__dark"
        text="ПРОДОЛЖИТЬ РАБОТУ"
       />
    </div>
  )
}

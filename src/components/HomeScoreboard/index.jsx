import React from 'react'
import styles from './styles.module.scss'
import { Scoreboard } from './Scoreboard'

export const HomeScoreboard = () => {
  return (
    <div className={styles.homeScoreboard}>
      <Scoreboard
        text="10:44"
        background="red"
      />
      <Scoreboard
        text="19:45"
        background="green"
      />
      <Scoreboard
        plusMinutes="Введи количество отработанных минут"
        text="+00"
        background="white"
      />
    </div>
  )
}

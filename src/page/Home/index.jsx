import React from 'react'
import styles from './styles.module.scss'
import { HeaderHome } from '../../components/HeaderHome'
import { HomeMain } from '../../components/HomeMain'
import { HomeTable } from '../../components/HomeTable'

export const Home = () => {
  return (
    <div className={styles.home}>
      <HeaderHome/>
      <div className={styles.mainPage}>
        <HomeMain />
        <HomeTable />
      </div>
    </div>
  )
}

import React from 'react'
import styles from './styles.module.scss'
import { HeaderHome } from '../../components/HeaderHome'
import { HomeMain } from '../../components/HomeMain'
import { Table } from '../../components/Table'

export const Home = () => {
  return (
    <div className={styles.home}>
      <HeaderHome />
      <div className={styles.mainPage}>
        <HomeMain />
        <Table />
      </div>
    </div>
  )
}

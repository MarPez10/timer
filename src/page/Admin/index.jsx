import React from 'react'
import styles from './styles.module.scss'
import { HeaderHome } from '../../components/HeaderHome'
import { AdminMain } from '../../components/AdminMain'

export const Admin = () => {
  return (
    <div className={styles.admin}>
      <HeaderHome />
      <div className={styles.mainPage}>
          <AdminMain />
      </div>
    </div>
  )
}

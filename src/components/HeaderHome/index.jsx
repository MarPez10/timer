import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { logOutUser } from '../../redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { DropDown } from '../../lib/DropDown'
import { Button } from '../../lib/Button'
import { EditForm } from '../Forms/EditForm'

export const HeaderHome = () => {
  const user = useSelector((s) => s.user)
  const [dropActive, setDropActive] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const dropRef = useRef()
  useEffect(() => {
    const handler = (e) => {
      if (!dropRef.current.contains(e.target)) {
        setDropActive(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })
  const dispatch = useDispatch()
  return (
    <div className={styles.headerHome}>
      <a href="/" className={styles.logo}>MarPez</a>
      <div className={styles.headerHome__right}>
        <Link to='/admin' className={styles.admin} onClick={''}>АДМИН ПАНЕЛЬ</Link>
        <div className={styles.dropDown} ref={dropRef}>
          <Button
            style='dropDownButtonMain'
            onClick={() => setDropActive(prev => !prev)}
            text={user.name}
          />
          <div className={styles.dropDownBlock} >
            <DropDown
              active={dropActive}
              setActive={setDropActive}
              text='Редактировать'
              onClick={() => setModalActive(true)}
              // to={'/home/edit'}
            />
            <DropDown
              active={dropActive}
              setActive={setDropActive}
              text='Выйти'
              onClick={() => {
                localStorage.removeItem('user')
                sessionStorage.removeItem('user')
                dispatch(logOutUser())
              }}
            />
          </div>
        </div>
        <Link className={styles.exit} onClick={() => {
          localStorage.removeItem('user')
          sessionStorage.removeItem('user')
          dispatch(logOutUser())
        }} to={''}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.627 25.4955C29.3313 28.4212 27.0724 30.8148 24.2265 32.2777C21.3807
          33.7406 18.1195 34.1844 14.9862 33.5353C11.8529 32.8862 9.0365 31.1834 7.00599
          28.7103C4.97548 26.2373 3.85341 23.1433 3.82663 19.9436C3.79985 16.7438 4.86998
          13.6315 6.85882 11.1248C8.84765 8.61812 11.6352 6.86837 14.7572 6.16692C17.8792 5.46548
          21.1473 5.85468 24.0172 7.26972C26.8872 8.68475 29.1858 11.0402 30.5303 13.9439" stroke="#FF1822"/>
          <line x1="18" y1="19.5" x2="39" y2="19.5" stroke="white"/>
          </svg>
        </Link>
      </div>
      <EditForm active={modalActive} setActive={setModalActive}/>
    </div>
  )
}

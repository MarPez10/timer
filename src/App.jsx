import React, { useEffect } from 'react'
import { Auth } from './page/Auth'
import { Home } from './page/Home'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './redux/reducers/user'
// import { Admin } from './page/Admin'

export function App () {
  const dispatch = useDispatch()
  // Этот useSelector здесь необходим, на кой хер ХЗ
  useSelector((s) => s.user)

  const userStorage = localStorage.getItem('user') ?? sessionStorage.getItem('user')
  useEffect(() => {
    if (userStorage) dispatch(addUser(JSON.parse(userStorage)))
  }, [])
  return (
    <div className='app'>
         {userStorage
           ? <Home />
           : <Auth />
         }
    </div>
  )
}

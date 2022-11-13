import React, { useEffect } from 'react'
import { Auth } from './page/Auth'
import { Home } from './page/Home'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './redux/reducers/user'

export function App () {
  const dispatch = useDispatch()
  const user = useSelector((s) => s.user)

  useEffect(() => {
    const userStorage = localStorage.getItem('user') ?? sessionStorage.getItem('user')
    if (userStorage) dispatch(addUser(JSON.parse(userStorage)))
  }, [])

  return (
    <div className='app'>
        {user.email
          ? <Home />
          : <Auth />
        }
    </div>
  )
}

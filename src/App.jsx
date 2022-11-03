import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Auth } from './page/Auth'
import { Home } from './page/Home'

export function App () {
  return (
    <div className='app'>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </div>
  )
}

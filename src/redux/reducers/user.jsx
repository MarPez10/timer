import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    isAdmin: false
  },
  reducers: {
    addUser: (_, { payload }) => ({
      name: payload.name,
      email: payload.email,
      isAdmin: payload.isAdmin
    }),
    logOutUser: () => ({
      name: '',
      email: '',
      isAdmin: false
    })
  }
})

export default userReducer.reducer
export const { addUser, logOutUser } = userReducer.actions

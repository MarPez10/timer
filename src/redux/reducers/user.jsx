import { createSlice } from '@reduxjs/toolkit'

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: {
      email: ''
    }
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload.obj
    }
  }
})

export default userReducer.reducer
export const { registerUser } = userReducer.actions

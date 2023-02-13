import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: localStorage.getItem("status") ? localStorage.getItem("status"):0,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
  },
  reducers: {
    activeUser: (state,action) => {
      state.user = action.payload
    },
    loginStatus: (state,action) => {
      state.status = action.payload
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { activeUser, loginStatus } = userSlice.actions

export default userSlice.reducer
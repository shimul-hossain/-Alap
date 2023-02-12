import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: localStorage.getItem("status") ? localStorage.getItem("status"):0,
    userId: localStorage.getItem("userId") ? localStorage.getItem("userId"):null,
  },
  reducers: {
    activeUser: (state,action) => {
      state.userId = action.payload
    },
    loginStatus: (state,action) => {
      state.status = action.payload
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { activeUser, loginStatus } = userSlice.actions

export default userSlice.reducer
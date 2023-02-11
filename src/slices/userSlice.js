import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginUser: localStorage.getItem("loginUser")? JSON.parse(localStorage.getItem("loginUser")):null,
  },
  reducers: {
    activeUser: (state,action) => {
      state.loginUser = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { activeUser } = userSlice.actions

export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  web3auth:null
}

export const userReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload
    },
    setweb3authReducer: (state, action) => {
      state.web3auth = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { addUser, setweb3authReducer } = userReducer.actions

export default userReducer.reducer
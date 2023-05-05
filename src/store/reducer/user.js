import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  web3auth:null,
  signer:null
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
    setSignerToRedux: (state, action) => {
      state.signer = action.payload
    },


  },
})

// Action creators are generated for each case reducer function
export const { addUser, setweb3authReducer, setSignerToRedux } = userReducer.actions

export default userReducer.reducer
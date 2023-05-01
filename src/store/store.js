import { configureStore } from '@reduxjs/toolkit'
import user from '@/store/reducer/user'
import addProject from './reducer/newProject'

export const store = configureStore({
  reducer: {
    user,
    addProject,
  },
})
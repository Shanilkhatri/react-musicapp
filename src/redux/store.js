import { configureStore } from '@reduxjs/toolkit'
import currentMusic from './slices/currentMusic'
import allMusic from './slices/allMusic'
export const store = configureStore({
  reducer: {
    music : currentMusic,
    allMusic: allMusic
  },
})
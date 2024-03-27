import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const currentMusic = createSlice({
  name: 'currentsong',
  initialState,
  reducers: {
    nowPlaying: (state, action) => {
        console.log(action.payload)
      state.value = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { nowPlaying } = currentMusic.actions

export default currentMusic.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allSongs: [],
  songIndex:0
}

export const allMusic = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    populateAllSongs:(state, action) => {
        state.allSongs = action.payload
    },
    incrementNext: (state)=>{
        ++ state.songIndex
    },
    decrementNext: (state)=>{
        -- state.songIndex 
    },
    setZero:(state)=>{
        state.songIndex = 0;
    },
    setMax:(state)=>{
        state.songIndex = state.allSongs.length -1;
    },

  },
});

// Action creators are generated for each case reducer function
export const { populateAllSongs, incrementNext, decrementNext, setZero, setMax} = allMusic.actions

export default allMusic.reducer
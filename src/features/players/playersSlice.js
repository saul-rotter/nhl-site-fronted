import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { 
    playerId: '1',
    playerName: 'Player 1',
    teamName: 'Team 1', 
    playerImage: 'url', 
    teamImage: 'url'
  },
  { 
    playerId: '2',
    playerName: 'Player 2',
    teamName: 'Team 2', 
    playerImage: 'url', 
    teamImage: 'url'
  }
]

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {}
})

export default playersSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    week: 3,
    gameDate: '2018-09-20 20:20:00',
    opponent: 'NYJ',
    opponentImage: 'https://static.trumedianetworks.com/images/nfl/teams/3430.png',
    Att: 23,
    Cmp: 17,
    Sack: 1,
    Int: 0,
    PsYds: 201,
    PsTD: 0,
    Rush: 2,
    RshYds: -2,
    RshTD: 0
  },
  {
    week: 4,
    gameDate: '2018-09-30 16:05:00',
    opponent: 'OAK',
    opponentImage: 'https://static.trumedianetworks.com/images/nfl/teams/2520.png',
    Att: 41,
    Cmp: 21,
    Sack: 2,
    Int: 2,
    PsYds: 295,
    PsTD: 2,
    Rush: 4,
    RshYds: 10,
    RshTD: 0
  },
]

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {}
})

export default gamesSlice.reducer
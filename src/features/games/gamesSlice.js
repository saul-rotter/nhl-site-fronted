import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    week: 3,
    gameDate: '2018-09-20 20:20:00',
    opponent: 'NYJ',
    opponentImage: 'https://static.trumedianetworks.com/images/nfl/teams/3430.png',
    att: 23,
    cmp: 17,
    sack: 1,
    int: 0,
    psYds: 201,
    psTD: 0,
    rush: 2,
    rshYds: -2,
    rshTD: 0
  },
  {
    week: 4,
    gameDate: '2018-09-30 16:05:00',
    opponent: 'OAK',
    opponentImage: 'https://static.trumedianetworks.com/images/nfl/teams/2520.png',
    att: 41,
    cmp: 21,
    sack: 2,
    int: 2,
    psYds: 295,
    psTD: 2,
    rush: 4,
    rshYds: 10,
    rshTD: 0
  },
]

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {}
})

export default gamesSlice.reducer
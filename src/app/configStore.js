import { configureStore } from '@reduxjs/toolkit'

import gamesReducer from '../features/games/gamesSlice'

export default configureStore({
  reducer: {
    games: gamesReducer
  }
})
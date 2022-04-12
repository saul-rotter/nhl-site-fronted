import { configureStore } from '@reduxjs/toolkit'

import playersReducer from '../features/players/playersSlice'

export default configureStore({
  reducer: {
    players: playersReducer
  }
})
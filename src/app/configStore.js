import { configureStore } from '@reduxjs/toolkit'

import gamesReducer from '../features/games/gamesSlice'
import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})
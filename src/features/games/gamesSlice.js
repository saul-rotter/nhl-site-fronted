import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../api/apiSlice'

const gamesAdapter = createEntityAdapter()

const initialState = gamesAdapter.getInitialState()
const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerGames: builder.query({
      query: (token, game_id) => ({
        url: `nfl/player/${game_id}`,
        headers: {
          'content-type':'application/json',
          'tempToken': token
        }
      }),
      transformResponse: responseData => {
        return gamesAdapter.setAll(initialState, responseData)
      }
    }),
  }),
})

export const { useGetPlayerGamesQuery } = extendedApiSlice

export const selectGamesResult = apiSlice.endpoints.getPlayerGames.select()

const selectGamesData = createSelector(
  selectGamesResult,
  (gamesResult) => gamesResult.data
)

export const { 
  selectAll: selectAllGames, 
  selectById: selectGameById, 
} =
gamesAdapter.getSelectors((state) => selectGamesData(state))
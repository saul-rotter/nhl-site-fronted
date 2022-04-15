import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router-dom'
import { GamesTable } from './features/games/GamesTable'
import { useGetAPITokenQuery } from './features/api/apiSlice'
import PlayersList from './features/players/playersList';

function App() {
  const {
    data: token,
    isLoading: isTokenLoading,
    isFetching: isTokenFetching,
    isSuccess: isTokenSuccess,
    isError: isTokenError,
    error: tokenError,
  } = useGetAPITokenQuery()

  let playerList = <div></div>
  let playerPage = <div></div>
  if (isTokenSuccess) {
    console.log(token['token'])
    playerList = <div><PlayersList token={token['token']}/></div>
    playerPage = <GamesTable token={token['token']}/>
  }
  return (
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              playerList
            }
          />
          <Route exact path="/players/:playerId" element={playerPage} />
        </Routes>
      </div>
  )
}

export default App
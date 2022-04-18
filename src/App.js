import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router-dom'
import { GamesTable } from './features/games/GamesTable'
import { PlayersList } from './features/players/playersList';
import PlayerNavigation from './components/Navbar';
import { fetchAPIToken } from './features/api/apiSlice'

function App() {
  const token = fetchAPIToken();

  let playerList = <div></div>;
  let playerPage = <div></div>;
  if (token) {
    playerList = <div><PlayerNavigation token={token}/></div>
    playerPage = <GamesTable token={token}/>
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
import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router-dom'
import PlayerPage from "./features/players/playerPage";
import PlayerNavigation from './components/Navbar';
import { fetchAPIToken } from './features/api/apiSlice'
import { Container } from 'react-bootstrap';

function App() {
  const token = fetchAPIToken();

  let playerList = <div></div>;
  let playerPage = <div></div>;
  if (token) {
    playerList = <div><PlayerNavigation token={token}/></div>
    playerPage = <PlayerPage token={token} />;
  }
  return (
      <div className="App">
        <Container fluid>
        {playerList}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <h1>Welcome to the homepage, choose a player from above</h1>
            }
          />
          <Route exact path="/players/:playerId" element={playerPage} />
        </Routes>
        </Container>
      </div>
  )
}

export default App
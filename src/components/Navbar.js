import React from 'react';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PlayerLink } from '../features/players/playersList';
import { useGetPlayersQuery } from '../features/players/playersSlice';


function PlayerNavigation({ token }) {
  console.log(token);
  const {
    data: players = [],
    isSuccess,
  } = useGetPlayersQuery(token);
  let content = null;
  
  if (isSuccess) {
    content = players.map(player => <NavItem key={player.playerId}><PlayerLink player={player}/></NavItem>);
  }
  return (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
        <Link to={`/`}>
          <img
            src={'../../trumedialogo.png'}
            alt={'Logo'}
          />
        </Link>
        </Navbar.Brand>
      <Nav>
        {content}
      </Nav>
    </Navbar>
  );
}

export default PlayerNavigation;

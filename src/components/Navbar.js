import React from 'react';
import { Navbar, Nav, NavItem, Container, Row, Col } from 'react-bootstrap';
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
    content = players.map(player => <Nav.Item style={{padding: 5}} key={player.playerId}><PlayerLink player={player}/></Nav.Item>);
  }
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" style={{height: "min-content", width:"max-content"}}>
        <Navbar.Brand href='/' style={{width: "20%", paddingRight: 5}}>
          <img
            src={'../../trumedialogo.png'}
            alt={'Logo'}
            className="img-thumbnail"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav style={{width: "25%", paddingRight: 10}}>
          {content}
        </Nav>
        </Navbar.Collapse>
    </Navbar>
    
  );
}

export default PlayerNavigation;

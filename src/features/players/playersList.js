import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useGetPlayersQuery } from './playersSlice'

export function PlayerLink({ player }) {
  return (
    <div>
      <Link to={`/players/${player.playerId}`}>
      <img data-tip="Select player to view statistics" 
        src={player.playerImage} alt={player.fullName}/>
      <br/>
      <div>{player.fullName}</div>
      </Link>
      <Outlet />
      </div>
  )
}

export function PlayersList({ token }) {
  const {
    data: players = [],
    isSuccess,
  } = useGetPlayersQuery(token)
  let content = token
  
  if (isSuccess) {
    content = players.map(player => <PlayerLink key={player.playerId} player={player}/>)
  }

  return content
}
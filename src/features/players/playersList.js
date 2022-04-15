import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useGetPlayersQuery } from './playersSlice'
let PlayerExcerpt = ({ player }) => {
  return (
    <div>
      <Link to={`/players/${player.playerId}`}>
        {player.playerId}
      </Link>
      <Outlet />
      </div>
  )
}

export default function PlayersList({ token }) {
  const {
    data: players = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPlayersQuery(token)
  let content = token
  
  if (isSuccess) {
    content = players.map(player => <PlayerExcerpt key={player.playerId} player={player}/>)
  }

  return content
}
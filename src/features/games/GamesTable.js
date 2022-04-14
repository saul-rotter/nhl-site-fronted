import React from 'react'
import { useSelector } from 'react-redux'
import Table from '../../components/Table'
import { 
  useGetAPITokenQuery, 
  useGetPlayerGamesQuery, 
  useGetPlayersQuery 
} from '../api/apiSlice'
import {selectToken} from '../players/playersSlice'

export default function GamesTable() {

  const games = useSelector(state => state.games)
  // const token = useSelector(selectToken)
  // console.log(token)
  
  const {
    data: token,
    isLoading: isTokenLoading,
    isFetching: isTokenFetching,
    isSuccess: isTokenSuccess,
    isError: isTokenError,
    error: tokenError,
  } = useGetAPITokenQuery()
  console.log(token)
  let content = ''
  if (isTokenSuccess) {
    const {
      data: players = [],
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error,
    } = useGetPlayersQuery(token['token'])
    if (isSuccess) {
      content = JSON.stringify(players)
    }
  }
  else {
    const {
      data: players = [],
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error,
    } = useGetPlayersQuery(token)
  }

  function prepareColumns () {
    const columns = [
        { Header: 'Week', accessor: 'week'},
        { Header: 'Game Date', accessor: 'gameDate'},
        { Header: 'Opponent', accessor: 'opponent'},
        { Header: 'Attempts', accessor: 'att'},
        { Header: 'Completions', accessor: 'cmp'},
        { Header: 'Interceptions', accessor: 'int'},
        { Header: 'Passing Touchdowns', accessor: 'psTD'},
        { Header: 'Passing Yards', accessor: 'psYds'},
        { Header: 'Sacks', accessor: 'sack'},
        { Header: 'Rushes', accessor: 'rush'},
        { Header: 'Rushing Yards', accessor: 'rshYds'},
        { Header: 'Rushing Touchdowns', accessor: 'rshTD'},
    ];
    return columns;
  }

 

  return (
    <div >
      <h2>Games</h2>
      <div>{content}</div>
    </div>
  )
}
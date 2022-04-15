// Tomorrow starts on fixing the querying. Not working, and once does can add styling as well
import React from 'react'
import { useSelector } from 'react-redux'
import Table from '../../components/Table'
import { useGetAPITokenQuery } from '../api/apiSlice'
import { useGetPlayerGamesQuery } from './gamesSlice'
import { useParams } from "react-router-dom";

export const GamesTable = () => {
  const { playerId } = useParams();
  const {
    data,
    isSuccess: isTokenSuccess,
  } = useGetAPITokenQuery()
  const token = data['token']
  let content = <div></div>
  if (isTokenSuccess) {
    console.log(token)
    const {
      data: games,
      isSuccess,
    } = useGetPlayerGamesQuery({token, playerId})
    if (isSuccess) {
      content = <Table columns={prepareColumns()} data={games}/>
    }
  }
  

  function prepareColumns () {
    const columns = [
        { Header: 'Week', accessor: 'week'},
        { Header: 'Game Date', accessor: 'gameDate'},
        { Header: 'Opponent', accessor: 'opponent'},
        { Header: 'Attempts', accessor: 'Att'},
        { Header: 'Completions', accessor: 'Cmp'},
        { Header: 'Interceptions', accessor: 'Int'},
        { Header: 'Passing Touchdowns', accessor: 'PsTD'},
        { Header: 'Passing Yards', accessor: 'PsYds'},
        { Header: 'Sacks', accessor: 'Sack'},
        { Header: 'Rushes', accessor: 'Rush'},
        { Header: 'Rushing Yards', accessor: 'RshYds'},
        { Header: 'Rushing Touchdowns', accessor: 'RshTD'},
    ];
    return columns;
  }
  

  return (
    <div>
      <h2>Games</h2>
      {content}
    </div>
  )
}
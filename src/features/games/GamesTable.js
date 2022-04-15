// Tomorrow starts on fixing the querying. Not working, and once does can add styling as well
import React from 'react'
import { useSelector } from 'react-redux'
import Table from '../../components/Table'
import { selectGameById } from './gamesSlice'
import { useGetAPITokenQuery } from '../api/apiSlice'

export const GamesTable = ({ match }) => {
  const { playerID } = match.params
  const {
    data: token,
    isSuccess: isTokenSuccess,
  } = useGetAPITokenQuery()
  let games = null
  if (isTokenSuccess) {
    let games = useSelector((state) => selectGameById(state, token, playerID))
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
  let content = <div></div>
  if (games) {
    content = <Table columns={prepareColumns()} data={games}/>
  }

  return (
    <div >
      <h2>Games</h2>
      {content()}
    </div>
  )
}
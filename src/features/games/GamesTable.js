import React from 'react'
import { useSelector } from 'react-redux'
import Table from '../../components/Table'

export const GamesTable = () => {

  const games = useSelector(state => state.games)

  function prepareColumnsForTable () {
    const columns = [
        { Header: 'Week', accessor: 'week'},
        { Header: 'Game Date', accessor: 'date' },
        { Header: 'Opponent',
            width: 100,
            Cell: props => {
                const { original } = props;
                const { opponent, logo } = original;
                return (
                    <div style={{display: "inline-block", width: "100px"}}>
                        <div>{opponent} {logo}</div>
                    </div>
                );
            }
        },
        { Header:  'Yards/Attempt', accessor: 'ydsAtt'},
        { Header: 'Completion %', accessor: 'complPct'},
        { Header: 'Attempts', accessor: 'attempts' },
        { Header: 'Completions', accessor: 'completions' },
        { Header: 'Interceptions', accessor: 'interceptions' },
        { Header: 'Passing Touchdowns', accessor: 'passingTouchdowns' },
        { Header: 'Passing Yards', accessor: 'passingYards' },
    ]
    return columns;
  }

  function getGameData() {
    return 0;
  }

  const renderedGames = <Table data={games} columns={prepareColumnsForTable()}/>

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedGames}
    </section>
  )
}
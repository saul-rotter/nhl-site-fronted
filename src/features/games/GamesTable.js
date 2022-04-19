import React from 'react'
import Table from '../../components/Table'
import { useGetPlayerGamesQuery } from './gamesSlice'
import { useParams } from "react-router-dom";
import PlayerCard from "../players/playerCard";

export const GamesTable = ({ token }) => {
  const { playerId } = useParams();
  let content = <div></div>;
  if (token) {
    const { data: games, isSuccess } = useGetPlayerGamesQuery({
      token,
      playerId,
    });
    if (isSuccess) {
      content = (
        <div>
          <PlayerCard player={games[0]} />
          <h2>Games</h2>
          <Table columns={prepareColumns()} data={games} />
        </div>
      );
    }
  }

  function prepareColumns() {
    const columns = [
      { Header: "Week", accessor: "week" },
      { Header: "Game Date", accessor: "gameDate" },
      { Header: "Opponent", accessor: "opponent" },
      { Header: "Attempts", accessor: "Att" },
      { Header: "Completions", accessor: "Cmp" },
      { Header: "Interceptions", accessor: "Int" },
      { Header: "Passing Touchdowns", accessor: "PsTD" },
      { Header: "Passing Yards", accessor: "PsYds" },
      { Header: "Sacks", accessor: "Sack" },
      { Header: "Rushes", accessor: "Rush" },
      { Header: "Rushing Yards", accessor: "RshYds" },
      { Header: "Rushing Touchdowns", accessor: "RshTD" },
      { Header: "Yds/Att", accessor: "Yd/Att" },
      { Header: "Cmp%", accessor: "Cmp%" },
    ];
    return columns;
  }

  return content;
};